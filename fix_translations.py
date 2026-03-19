#!/usr/bin/env python3
"""
Fix quiz questions in translations.js
Replaces Korean quiz questions in 9 languages with English equivalents
(since proper translations aren't available yet)
"""

import re
import json

# English quiz questions (source of truth)
ENGLISH_QUIZZES = {
    'q1': {
        'text': 'A rare free weekend! I usually...',
        'a1': 'Contact friends and make plans',
        'a2': 'Enjoy unplanned recharge time at home'
    },
    'q2': {
        'text': 'At a new gathering, I...',
        'a1': 'Initiate conversations and make friends quickly',
        'a2': 'Observe the situation and join conversations slowly'
    },
    'q3': {
        'text': 'After a long day, I recharge by...',
        'a1': 'Chatting and venting with friends or family',
        'a2': 'Quietly resting in my own space'
    },
    'q4': {
        'text': 'Messages are piling up. My reaction?',
        'a1': 'Reply immediately and keep the conversation going',
        'a2': 'Check them all at once later and reply briefly'
    },
    'q5': {
        'text': 'When learning something new, I prefer...',
        'a1': 'Discussing and debating with friends',
        'a2': 'Studying alone in quiet concentration'
    },
    'q6': {
        'text': 'When planning a trip, I...',
        'a1': 'Plan a detailed itinerary with restaurants and sights',
        'a2': 'Set a general direction and decide on the spot'
    },
    'q7': {
        'text': 'When buying a new phone, I focus on...',
        'a1': 'Specific specs like battery and camera megapixels',
        'a2': 'The overall vibe of what life will be like with this phone'
    },
    'q8': {
        'text': 'When my mind wanders, I usually think about...',
        'a1': 'Practical things like what I ate today or what to do',
        'a2': 'Random fantasies and creative ideas pop up'
    },
    'q9': {
        'text': 'When reading a novel, I...',
        'a1': 'Focus on the story plot and event progression',
        'a2': 'Think about the deeper meaning, symbolism, and author\'s intent'
    },
    'q10': {
        'text': 'I bought a new appliance. I...',
        'a1': 'Carefully read the manual and follow steps',
        'a2': 'Just turn it on and learn by using it'
    },
    'q11': {
        'text': 'A friend shares their troubles. I...',
        'a1': 'Identify the root cause and offer solutions',
        'a2': 'First empathize fully and accept their feelings'
    },
    'q12': {
        'text': 'Conflict arises in a team project. I...',
        'a1': 'Use data and logic to determine right and wrong',
        'a2': 'Find a direction everyone can agree on and harmonize'
    },
    'q13': {
        'text': 'Talking about a movie with a friend, I...',
        'a1': 'Point out plot holes and logical inconsistencies',
        'a2': 'Talk about character emotions and touching moments'
    },
    'q14': {
        'text': 'When giving feedback to a junior or friend, I...',
        'a1': 'State objective facts and improvements over feelings',
        'a2': 'Mention strengths first so they don\'t get hurt'
    },
    'q15': {
        'text': 'The car ahead is driving too slowly. I...',
        'a1': 'Wonder "Is there an accident? A beginner?" and reason it out',
        'a2': 'Feel frustrated or worried about the driver ahead'
    },
    'q16': {
        'text': 'Planning a trip with friends, I...',
        'a1': 'Need to pre-book accommodation, transport, and restaurants',
        'a2': 'Prefer just setting a rough direction and deciding on the go'
    },
    'q17': {
        'text': 'A deadline is 2 weeks away. I...',
        'a1': 'Make a plan right now and work on it bit by bit',
        'a2': 'My focus intensifies as the deadline approaches (crammer type)'
    },
    'q18': {
        'text': 'When shopping at the store, I...',
        'a1': 'Buy only what is on my pre-written list',
        'a2': 'Grab items when I see "Buy 1 Get 1" or "Limited stock"'
    },
    'q19': {
        'text': 'At a restaurant with over an hour wait, I...',
        'a1': 'Wait and eat there. I came all this way!',
        'a2': 'Look for another good place nearby'
    },
    'q20': {
        'text': 'The state of my room (desk) is?',
        'a1': 'Everything has its place and is generally organized',
        'a2': 'I know where everything is, but others might think it looks messy'
    }
}

# Languages to fix (have Korean quiz questions)
LANGS_TO_FIX = {
    'zh': 1742,  # Chinese
    'es': 2161,  # Spanish
    'ru': 3327,  # Russian
    'pt': 3714,  # Portuguese
    'id': 4102,  # Indonesian
    'hi': 4489,  # Hindi
    'vi': 4876,  # Vietnamese
    'th': 5263,  # Thai
    'tr': 5650,  # Turkish
}

def generate_quiz_json(lang_code):
    """Generate quiz questions in JavaScript object format"""
    lines = []
    for q_num in range(1, 21):
        q_key = f'q{q_num}'
        q = ENGLISH_QUIZZES[q_key]
        # Escape single quotes in text
        text = q['text'].replace("'", "\\'")
        a1 = q['a1'].replace("'", "\\'")
        a2 = q['a2'].replace("'", "\\'")
        lines.append(f"      {q_key}: {{ text: '{text}', a1: '{a1}', a2: '{a2}' }}")
    return ",\n".join(lines)

def main():
    # Read the current translations.js
    with open('js/translations.js', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Fix each language
    for lang_code in LANGS_TO_FIX.keys():
        print(f"Processing {lang_code}...")

        # Find the quizQuestions block for this language
        lang_section_start = None
        quiz_start = None
        quiz_end = None

        for i, line in enumerate(lines):
            if f"  {lang_code}: {{" in line:
                lang_section_start = i

            if lang_section_start is not None and "quizQuestions: {" in line:
                quiz_start = i

            if quiz_start is not None and line.strip() == "}," and quiz_end is None:
                # Check if this is the end of quizQuestions
                quiz_end = i
                break

        if quiz_start is not None and quiz_end is not None:
            print(f"  Found quiz block: lines {quiz_start+1} to {quiz_end+1}")

            # Generate new quiz questions
            new_quiz_lines = []
            new_quiz_lines.append("    quizQuestions: {\n")
            for q_num in range(1, 21):
                q_key = f'q{q_num}'
                q = ENGLISH_QUIZZES[q_key]
                # Escape single quotes
                text = q['text'].replace("'", "\\'")
                a1 = q['a1'].replace("'", "\\'")
                a2 = q['a2'].replace("'", "\\'")
                new_quiz_lines.append(f"      {q_key}: {{ text: '{text}', a1: '{a1}', a2: '{a2}' }},\n")
            new_quiz_lines.append("    },\n")

            # Replace the quiz block
            lines = lines[:quiz_start] + new_quiz_lines + lines[quiz_end+1:]
            print(f"  Replaced {quiz_end - quiz_start} lines")

    # Write back
    with open('js/translations.js', 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print("✅ Translations fixed!")
    print(f"📝 Fixed {len(LANGS_TO_FIX)} languages")

if __name__ == '__main__':
    main()
