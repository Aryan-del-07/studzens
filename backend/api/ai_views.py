"""
api/ai_views.py — AI Counseling Controller powered by Google Gemini API / Vertex AI
"""
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import College, Exam

SYSTEM_PROMPT = """
You are "Studzens AI Counselor", an expert, friendly, and highly knowledgeable advisor specializing in top Indian private universities: VIT, SRM, Manipal (MAHE), and BITS Pilani across all their campuses.
You help students evaluate their chances based on VITEEE, SRMJEEE, MET, BITSAT, and JEE Main.
You know about category-wise fee structures, branch-wise cutoffs, placement LPA averages, and campus life across Vellore, Chennai, AP, Bhopal, KTR, Ramapuram, Manipal, Jaipur, Pilani, Goa, and Hyderabad.
Provide clear, structured, encouraging, and accurate advice using bullet points where appropriate.
"""

class AICounselView(APIView):
    """
    POST /api/ai/counsel/
    Payload: { "message": "What is the difference between VIT Vellore and SRM KTR for CSE?" }
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        user_message = request.data.get('message', '').strip()
        if not user_message:
            return Response({'error': 'Message is required'}, status=status.HTTP_400_BAD_REQUEST)

        api_key = os.getenv('GEMINI_API_KEY') or os.getenv('GOOGLE_API_KEY')

        if api_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=api_key)
                model = genai.GenerativeModel("gemini-1.5-flash")
                prompt = f"{SYSTEM_PROMPT}\n\nStudent Question: {user_message}"
                response = model.generate_content(prompt)
                reply = response.text
                return Response({'reply': reply, 'provider': 'Gemini 1.5 Flash'})
            except Exception as e:
                print(f"Gemini API Exception: {e}")

        # Smart contextual fallback when API key is pending
        total_colleges = College.objects.count()
        reply_lower = user_message.lower()

        if 'vit' in reply_lower or 'category' in reply_lower:
            reply = (
                "Here is the official **VIT 5-Category Fee Structure** (B.Tech CSE) based on VITEEE rank:\n\n"
                "• **Category 1**: ₹1.98 Lakh / year (VITEEE Ranks ~1 - 20,000)\n"
                "• **Category 2**: ₹3.07 Lakh / year (VITEEE Ranks ~20,001 - 45,000)\n"
                "• **Category 3**: ₹4.05 Lakh / year (VITEEE Ranks ~45,001 - 70,000)\n"
                "• **Category 4**: ₹4.48 Lakh / year (VITEEE Ranks ~70,001 - 90,000)\n"
                "• **Category 5**: ₹4.93 Lakh / year (VITEEE Ranks ~90,001+)\n\n"
                "💡 **Note**: Centralized placements apply across Vellore & Chennai campuses!"
            )
        elif 'srm' in reply_lower:
            reply = (
                "Here is the breakdown for **SRM IST Campuses** via SRMJEEE:\n\n"
                "• **SRM Kattankulathur (KTR Main)**: NIRF #18 | Avg ₹7.7 LPA | Highest ₹1.1 Cr | Fee ~₹3.0L - ₹3.5L/yr\n"
                "• **SRM Ramapuram**: Avg ₹6.5 LPA | Fee ~₹2.5L/yr\n"
                "• **SRM Vadapalani**: City Campus | Avg ₹6.2 LPA | Fee ~₹2.5L/yr\n"
                "• **SRM NCR Modinagar**: Delhi NCR hub | Avg ₹5.8 LPA | Fee ~₹2.1L/yr"
            )
        elif 'manipal' in reply_lower or 'met' in reply_lower or 'mit' in reply_lower:
            reply = (
                "Here is the breakdown for **Manipal (MAHE) Campuses** via MET:\n\n"
                "• **MIT Manipal (Main Campus)**: NIRF #61 | Avg ₹12.5 LPA | Highest ₹54 LPA | Fee ~₹3.35L/yr\n"
                "• **MAHE Bengaluru**: Yelahanka IT Corridor | Avg ₹9.0 LPA | Fee ~₹3.5L/yr\n"
                "• **Manipal University Jaipur (MUJ)**: Resort-style campus | Avg ₹7.5 LPA | Highest ₹85 LPA | Fee ~₹3.4L/yr"
            )
        elif 'bits' in reply_lower or 'bitsat' in reply_lower:
            reply = (
                "Here is the breakdown for **BITS Pilani Campuses** via BITSAT:\n\n"
                "• **BITS Pilani (Main)**: NIRF #25 | Avg ₹20.5 LPA | Highest ₹60.7 LPA | Fee ~₹5.41L/yr\n"
                "• **BITS Goa**: Avg ₹19.2 LPA | Highest ₹60 LPA | Fee ~₹5.41L/yr\n"
                "• **BITS Hyderabad**: Avg ₹18.8 LPA | Highest ₹60 LPA | Fee ~₹5.41L/yr\n\n"
                "💡 **Key Feature**: Zero reservation policy — 100% merit based on BITSAT score."
            )
        else:
            reply = (
                f"Hello! I am your Studzens AI Private University Counselor. I have indexed {total_colleges} campuses across VIT, SRM, Manipal, and BITS.\n\n"
                "Ask me anything about:\n"
                "1. **VITEEE / SRMJEEE / MET / BITSAT Cutoffs & Ranks**\n"
                "2. **Category 1 to 5 Fee Slabs**\n"
                "3. **Campus Placement Comparison (Vellore vs KTR vs MIT Manipal vs Pilani)**"
            )

        return Response({'reply': reply, 'provider': 'Studzens AI Engine'})
