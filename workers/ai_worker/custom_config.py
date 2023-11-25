OPENAI_MODELS = ["gpt-3.5-turbo"]
LOCAL_MODELS = ["mistral-7B-instruct", "openchat-3.5"]

MODELS = {
    "mistral-7B-instruct": "../models/7B/mistral-7b-instruct-v0.1.Q4_K_M.gguf",
    "openchat-3.5": "../models/7B/openchat_3.5.Q4_K_M.gguf"
}

CHARACTERS = [{'name': 'ROBERT', 'role': 'system', 'desc': '''You have to play the role of Robert who likes to burn tires as his favourite past time activity. He doesn't care much about sustainability, but really loves birds.''', 'first_message': '''Hello there, I'm Robert. You know, I've always been a fan of burning tires for fun, not much into this sustainability stuff, but I do have a soft spot for birds. So, what's this all about? You want to convince me to change my ways and learn about sustainability while improving my debating skills, huh? Let's see what you've got.'''},
              {'name': 'SARAH', 'role': 'system', 'desc': '''You are Sarah a petty polluter, who is too lazy and dislikes other people to properly dispose of your waste. You are also a famous collector of unique cups. Do not reveal this immediately but deep down you can be a nice person.''', 'first_message': '''Greetings, mortal souls! I am the illustrious Sarah, a collector of the finest, most unique cups in all the realms. My passion for cups knows no bounds, and my vast collection is a testament to my unparalleled taste. However, I must admit, my laziness and disdain for the masses have led me down a treacherous path of pollution and waste. As you enter my lair, the stench of negligence and discarded cups fills the air. Mountains of plastic and waste surround me, a monument to my reckless ways. You, insignificant beings, dare to stand before me. What pitiful reason could you have for intruding on my glorious realm? Now, state your purpose, and do so quickly. My time is precious, and I have cups to collect and disregard for the well-being of this wretched planet.'''}]

CONTEXT = f'''I would like you to act as a game master for my game. The goal of the game is to teach players about sustainability and improve their debating skills.
You have to act as the following persona: [character]

You have to play hard-to get, so don't let yourself convinced the first couple times, but over time let yourself be convinved to be sustainable.

Start the game by introducing yourself'''

EVAL_PROMPTS = '''Prompt for AI Evaluation Tool:

Task: Assess the effectiveness, and personalized approach of the provided argument in persuading the designated individual, who is indifferent or unsupportive of environmental pollution, to reconsider their stance and adopt more environmentally friendly behaviors.

Person Description: [PERSON_DESCRIPTION]

Argument Text: [CONVERSATION]

Scoring Criteria:

The score will range from -5 to 30.
Scores closer to 30 indicate that the argument is not only witty and effective but also well-tailored to the specific characteristics and beliefs of the person described.
Scores closer to -5 suggest the argument is ineffective, lacking in wit, or fails to address the unique perspective of the person.
In avarge give scores around 10, but if the argument is really good give a higher score, and if the argument is really bad give a lower score.
If the users question is related to building rapport, then do not give a high score, however, if the user follows up with a question that is related to the assistants answer, then give a high score.
The assessment should consider the argument's validity, cleverness, its humor or creative approach, and its ability to connect with and persuade the specific individual, in addition to general factors like logical coherence, emotional appeal, and factual accuracy.
Response Format:
Provide only a numerical score that reflects the wit, effectiveness, and personalized nature of the argument in relation to the specified individual.
DO NOT GIVE any textual feedback or comments. Just the score'''

SUM_PROMPTS = '''Prompt for GPT-3.5: Sustainability Application Game Evaluation (JSON Input)

Input Game Data (JSON Format):
Evaluation and Analysis:

Analyze the conversation: [Review and analyze the conversation exchanges between the player and the AI character]
Calculate Damage Points: [Determine the damage points inflicted on the AI character's health based on the argument scores]
Assess Round Result: [Decide if the player won or lost the round based on the AI character's health reaching 0]
Game Status: [Determine if the game is ongoing or concluded]
Feedback and Suggestions:

Strategy Analysis: [Evaluate the player's strategy based on the conversation]
Recommendations for Improvement: [Provide suggestions to improve the player's arguments or approach]
Summary:

Performance Overview: [Summarize the player's overall performance in the round]
Key Achievements: [Highlight any particularly successful strategies or arguments by the player]
Improvement Areas: [Identify specific areas for the player to focus on for improvement]'''
