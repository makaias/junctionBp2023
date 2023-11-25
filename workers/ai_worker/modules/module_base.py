from ..custom_config import *


class BaseModule:
    def __init__(model_name: str):
        pass

    def execute(self, handler: any):
        pass

# "details": {"game_type": "ROBERT","hp": 100}
    def setup_eval_prompt(self, handler):
        player_dict = self.__get_player_dict(handler)

        eval_prompt = EVAL_PROMPTS.replace(
            '[PERSON_DESCRIPTION]', player_dict['desc'])

        eval_prompt = eval_prompt.replace(
            '[CONVERSATION]', str(handler.messages()))

        return {'role': 'system', 'content': eval_prompt}

    def setup_system_prompt(self, handler):
        player_dict = self.__get_player_dict(handler)

        return {'role': 'system', 'content': CONTEXT.replace('[character]', player_dict['desc'])}

    def __get_player_dict(self, handler):
        player_name = handler.game_details()['game_type']

        player_dict = [
            playerDict for playerDict in CHARACTERS if playerDict['name'] == player_name][0]

        return player_dict
