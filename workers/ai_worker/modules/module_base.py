from ..custom_config import *


class BaseModule:
    def __init__(self, handler: any):
        self.__modelHandler = handler

    def execute(self):
        pass

# "details": {"game_type": "ROBERT","hp": 100}
    def setup_eval_prompt(self):
        player_dict = self.get_player_dict()

        eval_prompt = EVAL_PROMPTS.replace(
            '[PERSON_DESCRIPTION]', player_dict['desc'])

        eval_prompt = eval_prompt.replace(
            '[CONVERSATION]', str(self.__modelHandler.messages()))

        return {'role': 'system', 'content': eval_prompt}

    def setup_system_prompt(self):
        player_dict = self.get_player_dict()

        return {'role': 'system', 'content': CONTEXT.replace('[character]', player_dict['desc'])}

    def get_player_dict(self):
        player_name = self.__modelHandler.game_details()['game_type']

        player_dict = [
            playerDict for playerDict in CHARACTERS if playerDict['name'] == player_name][0]

        return player_dict
