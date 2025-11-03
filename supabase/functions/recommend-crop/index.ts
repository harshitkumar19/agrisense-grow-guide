import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cropYear, season, state, rainfall, fertilizer, pesticide, area } = await req.json();
    
    console.log('Received crop recommendation request:', { cropYear, season, state, rainfall, fertilizer, pesticide, area });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an agricultural expert AI that recommends optimal crops based on various farming parameters. 
Analyze the provided data and recommend the most suitable crop with detailed reasoning.

Consider:
- Climate and seasonal patterns
- Regional agricultural practices
- Soil conditions implied by rainfall
- Input resources (fertilizer, pesticide)
- Farm size and scalability

Provide a concise recommendation with:
1. Recommended crop name
2. Brief reasoning (2-3 sentences)
3. Expected yield estimate
4. Key cultivation tips`;

    const userPrompt = `Based on the following agricultural parameters, recommend the best crop:

Crop Year: ${cropYear}
Season: ${season}
State: ${state}
Annual Rainfall: ${rainfall} mm
Fertilizer: ${fertilizer} kg
Pesticide: ${pesticide} kg
Area: ${area} hectares

Provide your recommendation in this format:
CROP: [crop name]
REASONING: [why this crop is suitable]
YIELD: [expected yield estimate]
TIPS: [key cultivation tips]`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI gateway error');
    }

    const data = await response.json();
    const recommendation = data.choices[0].message.content;
    
    console.log('AI recommendation received:', recommendation);

    return new Response(JSON.stringify({ recommendation }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in recommend-crop function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
