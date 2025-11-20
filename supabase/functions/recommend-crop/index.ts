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
    const { cropYear, season, district, fertilizer, pesticide, area } = await req.json();
    
    console.log('Received crop recommendation request:', { cropYear, season, district, fertilizer, pesticide, area });

    // ============================================
    // MODEL USED HERE
    // ============================================
    // This is where you should integrate your ML/AI model
    // Input parameters available:
    // - cropYear: number (1997 to current year)
    // - season: string (Rabi/Kharif/Zaid)
    // - district: string (UP district name)
    // - fertilizer: number (kg)
    // - pesticide: number (kg)
    // - area: number (acres)
    //
    // Expected output format:
    // {
    //   recommendation: string containing:
    //     "CROP: [Crop name]
    //      Since rainfall in selected area is [rainfall in mm], soil type is [soil type]
    //      REASONING: [explanation]
    //      YIELD: [yield estimate per acre]
    //      TIPS: [farming tips]"
    // }
    // ============================================

    // ============================================
    // AI IS USED HERE
    // ============================================
    // Placeholder response - Replace this with your model's prediction
    const recommendation = `CROP: Wheat
Since rainfall in selected area is 800mm, soil type is Loamy
REASONING: Based on the season, district climate, and available resources, wheat is suitable for this region.
YIELD: Expected yield is approximately 15-20 quintals per acre
TIPS: Ensure proper irrigation, use recommended fertilizer doses, monitor for pests regularly`;
    // ============================================

    console.log('Recommendation generated:', recommendation);

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
