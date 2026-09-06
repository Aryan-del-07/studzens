"""
seed.py — Populates initial sample data for Studzens (Django backend)
Run via: python backend/seed.py
"""
import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "studzens.settings")
django.setup()

from api.models import (
    User, Profile, College, Program, Placement,
    Review, Exam, CollegeExam, Bookmark, Facility,
    Role, Tier, Ownership, ProgramType, BookmarkCategory
)

def seed():
    print("[*] Seeding Studzens database...")

    # 1. Admin User
    admin, created = User.objects.get_or_create(
        email="admin@studzens.com",
        defaults={
            "name": "Admin User",
            "role": Role.ADMIN,
            "is_staff": True,
            "is_superuser": True,
        }
    )
    if created:
        admin.set_password("admin123")
        admin.save()
        Profile.objects.get_or_create(user=admin, city="New Delhi", state="Delhi", target_stream="Computer Science")
        print("  [+] Created Superuser: admin@studzens.com (password: admin123)")

    # 2. Demo Student User
    student, created = User.objects.get_or_create(
        email="student@studzens.com",
        defaults={
            "name": "Aarav Sharma",
            "role": Role.STUDENT,
        }
    )
    if created:
        student.set_password("student123")
        student.save()
        Profile.objects.get_or_create(user=student, city="Bengaluru", state="Karnataka", target_stream="B.Tech CS", target_year=2026)
        print("  [+] Created Demo Student: student@studzens.com (password: student123)")

    # 3. Exams
    jee_adv, _ = Exam.objects.get_or_create(
        name="JEE Advanced",
        defaults={"full_name": "Joint Entrance Examination (Advanced)", "level": "National"}
    )
    jee_main, _ = Exam.objects.get_or_create(
        name="JEE Main",
        defaults={"full_name": "Joint Entrance Examination (Main)", "level": "National"}
    )
    bitsat, _ = Exam.objects.get_or_create(
        name="BITSAT",
        defaults={"full_name": "Birla Institute of Technology and Science Admission Test", "level": "National"}
    )
    ugee, _ = Exam.objects.get_or_create(
        name="UGEE",
        defaults={"full_name": "Undergraduate Engineering Entrance Examination", "level": "Institute"}
    )
    print("  [+] Created Exams: JEE Advanced, JEE Main, BITSAT, UGEE")

    # 4. Colleges
    colleges_data = [
        {
            "name": "Indian Institute of Technology Bombay",
            "short_name": "IIT Bombay",
            "established_year": 1958,
            "city": "Mumbai",
            "state": "Maharashtra",
            "tier": Tier.TIER_1,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "550 Acres",
            "faculty_count": 650,
            "website": "https://www.iitb.ac.in",
            "lat": 19.1334,
            "lng": 72.9133,
            "nirf_rank": 3,
            "avg_package_lpa": 23.5,
            "annual_fee_lpa": 2.2,
            "exams": [jee_adv],
            "programs": [
                {"name": "Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 220000, "intake": 140},
                {"name": "Electrical Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 220000, "intake": 160},
                {"name": "Mechanical Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 220000, "intake": 180},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 23.5, "highest_package": 120.0, "placement_rate": 91.5},
                {"year": 2023, "avg_package_lpa": 21.8, "highest_package": 100.0, "placement_rate": 93.0},
            ],
            "facilities": [
                {"name": "Hostel & Dining", "has_facility": True, "details": "18 residential hostels with high-speed WiFi"},
                {"name": "Sports Complex", "has_facility": True, "details": "Olympic size swimming pool, athletics track, gym"},
            ]
        },
        {
            "name": "Indian Institute of Technology Delhi",
            "short_name": "IIT Delhi",
            "established_year": 1961,
            "city": "New Delhi",
            "state": "Delhi",
            "tier": Tier.TIER_1,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "320 Acres",
            "faculty_count": 600,
            "website": "https://home.iitd.ac.in",
            "lat": 28.5450,
            "lng": 77.1926,
            "nirf_rank": 2,
            "avg_package_lpa": 24.1,
            "annual_fee_lpa": 2.25,
            "exams": [jee_adv],
            "programs": [
                {"name": "Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 225000, "intake": 99},
                {"name": "Artificial Intelligence & Data Science", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 225000, "intake": 40},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 24.1, "highest_package": 130.0, "placement_rate": 92.0},
            ],
            "facilities": [
                {"name": "Central Library", "has_facility": True, "details": "300,000+ print volumes and digital portal"},
            ]
        },
        {
            "name": "Birla Institute of Technology and Science, Pilani",
            "short_name": "BITS Pilani",
            "established_year": 1964,
            "city": "Pilani",
            "state": "Rajasthan",
            "tier": Tier.TIER_1,
            "ownership": Ownership.PRIVATE,
            "campus_size": "328 Acres",
            "faculty_count": 450,
            "website": "https://www.bits-pilani.ac.in",
            "lat": 28.3639,
            "lng": 75.5870,
            "nirf_rank": 25,
            "avg_package_lpa": 20.8,
            "annual_fee_lpa": 5.5,
            "exams": [bitsat],
            "programs": [
                {"name": "B.E. Computer Science", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 550000, "intake": 200},
                {"name": "B.E. Electronics & Communication", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 550000, "intake": 180},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 20.8, "highest_package": 60.0, "placement_rate": 89.0},
            ],
            "facilities": [
                {"name": "Practice School System", "has_facility": True, "details": "Mandatory 6-month industry internship"},
            ]
        },
        {
            "name": "International Institute of Information Technology, Hyderabad",
            "short_name": "IIIT Hyderabad",
            "established_year": 1998,
            "city": "Hyderabad",
            "state": "Telangana",
            "tier": Tier.TIER_1,
            "ownership": Ownership.SEMI_GOVERNMENT,
            "campus_size": "66 Acres",
            "faculty_count": 120,
            "website": "https://www.iiit.ac.in",
            "lat": 17.4455,
            "lng": 78.3489,
            "nirf_rank": 55,
            "avg_package_lpa": 30.2,
            "annual_fee_lpa": 4.0,
            "exams": [jee_main, ugee],
            "programs": [
                {"name": "B.Tech Computer Science & Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 400000, "intake": 150},
                {"name": "B.Tech Electronics & Communication", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 400000, "intake": 90},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 30.2, "highest_package": 102.0, "placement_rate": 98.0},
            ],
            "facilities": [
                {"name": "Research Centers", "has_facility": True, "details": "CVIT, LTRC, SERC world-class AI/ML research labs"},
            ]
        }
    ]

    for c_data in colleges_data:
        exams_list = c_data.pop("exams", [])
        programs_list = c_data.pop("programs", [])
        placements_list = c_data.pop("placements", [])
        facilities_list = c_data.pop("facilities", [])

        college, c_created = College.objects.get_or_create(
            name=c_data["name"],
            defaults=c_data
        )

        # Attach exams
        for ex in exams_list:
            CollegeExam.objects.get_or_create(college=college, exam=ex)

        # Attach programs
        for prog in programs_list:
            Program.objects.get_or_create(college=college, name=prog["name"], defaults=prog)

        # Attach placements
        for plc in placements_list:
            Placement.objects.get_or_create(college=college, year=plc["year"], defaults=plc)

        # Attach facilities
        for fac in facilities_list:
            Facility.objects.get_or_create(college=college, name=fac["name"], defaults=fac)

        if c_created:
            print(f"  [+] Created College: {college.short_name or college.name}")

    # 5. Add a sample review
    iitb = College.objects.get(short_name="IIT Bombay")
    Review.objects.get_or_create(
        user=student,
        college=iitb,
        defaults={
            "rating": 5,
            "content": "Unmatched research opportunities, competitive environment, and amazing alumni network!",
        }
    )

    # 6. Add a sample bookmark
    Bookmark.objects.get_or_create(
        user=student,
        college=iitb,
        defaults={"category": BookmarkCategory.DREAM}
    )

    print("[SUCCESS] Database seeded successfully!")

if __name__ == "__main__":
    seed()
