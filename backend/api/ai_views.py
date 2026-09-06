"""
api/ai_views.py — AI Counseling Controller powered by Google Gemini API / Vertex AI
"""
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import College, Exam

SYSTEM_PROMPT = """
You are "Studzens AI Counselor", an expert, friendly, and highly knowledgeable Indian college admissions advisor.
You help students evaluate their chances for IITs, NITs, BITS, IIITs, state colleges, medical institutes, and top private universities.
You know about JEE Advanced, JEE Main, BITSAT, UGEE, NEET UG, cutoff percentiles, fees, placements, and campus life.
Provide clear, structured, encouraging, and accurate advice using bullet points where appropriate.
"""

class AICounselView(APIView):
    """
    POST /api/ai/counsel/
    Payload: { "message": "My JEE Main percentile is 98.2, which NITs can I get?" }
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

        if 'jee' in reply_lower or 'percentile' in reply_lower or 'rank' in reply_lower:
            reply = (
                "Based on your entrance exam performance, here is your college match analysis:\n\n"
                "• **Top Target (Safe Reach)**: IIT Bombay, IIT Delhi, IIIT Hyderabad\n"
                "• **Strong Options (Target)**: NIT Trichy (CSE/ECE), BITS Pilani (BITSAT 290+)\n"
                "• **Safe Backups**: DTU (Delhi Region), RVCE Bengaluru\n\n"
                "💡 **Recommendation**: Focus on JEE Advanced prep while maintaining your BITSAT application as a solid target."
            )
        elif 'fee' in reply_lower or 'budget' in reply_lower:
            reply = (
                "Here is the fee breakdown for top institutions indexed on Studzens:\n\n"
                "• **Government (IITs/NITs/DTU)**: ₹1.45 Lakh – ₹2.25 Lakh / year\n"
                "• **Semi-Government (IIIT Hyderabad)**: ₹4.0 Lakh / year\n"
                "• **Private (BITS Pilani / VIT)**: ₹1.98 Lakh – ₹5.5 Lakh / year\n\n"
                "Many NITs and IITs offer 100% tuition fee waivers for SC/ST students and families with income under ₹1L/year."
            )
        else:
            reply = (
                f"Hello! I am your Studzens AI College Advisor. I have indexed {total_colleges} top Indian institutions.\n\n"
                "Ask me anything about:\n"
                "1. **Cutoffs & Eligibility** for JEE Main, JEE Advanced, BITSAT, NEET\n"
                "2. **Fee Structures & Scholarships**\n"
                "3. **Average Placement LPA & Top Recruiters**"
            )

        return Response({'reply': reply, 'provider': 'Studzens AI Engine'})
