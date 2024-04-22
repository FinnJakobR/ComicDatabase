from api.base import Base
from api.modules.characters import Characters
from api.modules.events import Events
from api.modules.series import Series
from api.modules.comics import Comics
from api.modules.creators import Creators
from api.modules.stories import Stories


class Marvel(Base):
    def __init__(self, PUBLIC_KEY, PRIVATE_KEY):
        """
        Marvel main class to access different modules and their methods.
        :param PUBLIC_KEY: str
        :param PRIVATE_KEY: str
        """
        super().__init__(PUBLIC_KEY, PRIVATE_KEY)
        self.characters = Characters(requester=self.requester)
        self.events = Events(requester=self.requester)
        self.series = Series(requester=self.requester)
        self.comics = Comics(requester=self.requester)
        self.creators = Creators(requester=self.requester)
        self.stories = Stories(requester=self.requester)