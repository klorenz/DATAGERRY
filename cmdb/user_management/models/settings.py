# DATAGERRY - OpenSource Enterprise CMDB
# Copyright (C) 2019 NETHINKS GmbH
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program. If not, see <https://www.gnu.org/licenses/>.

from datetime import datetime
from enum import Enum
from json import dumps
from typing import Any
from pymongo import IndexModel

from cmdb.data_storage.database_utils import default
from cmdb.framework.utils import Collection, Model


class UserSettingType(Enum):
    """
    Type of user settings. Applied only on user application level.
    SERVER means only backend settings. APPLICATION only the frontend.
    Global means both.
    """
    GLOBAL = 'GLOBAL'
    APPLICATION = 'APPLICATION'
    SERVER = 'SERVER'


class UserSettingPayload:
    """
    Payload wrapper user settings.
    """
    __slots__ = 'name', 'setting'

    def __init__(self, setting: Any):
        """
        Constructor of `UserSettingPayload`.

        Args:
            setting (Any): Settings option/body/payload.
        """
        self.setting: Any = setting

    @classmethod
    def from_data(cls, data: dict) -> "UserSettingPayload":
        """
        Create a `UserSettingEntry` instance from database.

        Args:
            data (dict): Database user settings values.

        Returns:
            UserSettingPayload: Instance of `UserSettingEntry`.
        """
        return cls(
            setting=data
        )

    @classmethod
    def to_data(cls, instance: "UserSettingPayload") -> str:
        """
        Get the setting to database format.

        Args:
            instance (UserSettingPayload): Instance of `UserSettingPayload`.

        Returns:
            str: JSON dump data of `UserSettingPayload`.
        """
        return dumps(UserSettingPayload.to_dict(instance), default=default)

    @classmethod
    def to_dict(cls, instance: "UserSettingPayload") -> dict:
        """
        Get the dictionary values of `UserSettingEntry`

        Args:
            instance (UserSettingPayload): Instance of `UserSettingEntry`.

        Returns:
            dict: Return the `UserSettingEntry` as dict.
        """
        return instance.setting


class UserSettingModel:
    """
    User settings model. Holds all stored user-settings for a specific user.
    Every user has exact one model document in the database collection.
    """

    COLLECTION: Collection = 'management.users.settings'
    MODEL: Model = 'UserSetting'
    INDEX_KEYS = [
        {'keys': [('identifier', 1), ('user_id', 1)],
         'name': 'identifier-user',
         'unique': True}
    ]

    SCHEMA: dict = {
        'identifier': {
            'type': 'string',
            'required': True
        },
        'user_id': {
            'type': 'integer',
            'required': True
        },
        'setting': {
            'type': 'dict',
            'required': False
        },
        'setting_type': {
            'type': 'string',
            'required': True
        },
        'setting_time': {
            'type': 'datetime',
            'default': datetime.now(),
            # 'coerce': lambda s: datetime.strptime(s, 'YYYY-MM-DD HH:MM:SS.mmmmmm'),
            'required': False
        }
    }

    __slots__ = 'identifier', 'user_id', 'setting', 'setting_type', 'setting_time'

    def __init__(self, identifier: str, user_id: int, setting: UserSettingPayload, setting_type: UserSettingType,
                 setting_time: datetime = None):
        """
        Constructor of `UserSettingModel`.

        Args:
            identifier: (str): Identifier or Name of the setting
            user_id (int): PublicID of the user
            setting (UserSettingPayload): User setting
            setting_type (UserSettingType): Type of the setting scope.
            setting_time: Datetime of the setting creation.
        """
        self.identifier: str = identifier
        self.user_id: int = user_id
        self.setting: UserSettingPayload = setting
        self.setting_type: UserSettingType = setting_type
        self.setting_time: datetime = setting_time

    @classmethod
    def get_index_keys(cls):
        return [IndexModel(**index) for index in cls.INDEX_KEYS]

    @classmethod
    def from_data(cls, data: dict, *args, **kwargs) -> "UserSettingModel":
        """
        Create a `UserSettingsModel` instance from database.

        Args:
            data (dict): Database user settings.

        Returns:
            UserSettingModel: Instance of `UserSettingsModel`.
        """
        return cls(
            identifier=data.get('identifier'),
            user_id=int(data.get('user_id')),
            setting=UserSettingPayload.from_data(data=data.get('settings', None)),
            setting_type=UserSettingType(data.get('setting_type')),
            setting_time=data.get('setting_time', None)
        )

    @classmethod
    def to_data(cls, instance: "UserSettingModel") -> str:
        """
        Get the user settings to database format.

        Args:
            instance (UserSettingModel): Instance of `UserSettingsModel`.

        Returns:
            str: JSON dump data of `UserSettingsModel`.
        """

        return dumps(UserSettingModel.to_dict(instance), default=default)

    @classmethod
    def to_dict(cls, instance: "UserSettingModel") -> dict:
        """
        Get the dictionary values of `UserSettingsModel`

        Args:
            instance (UserSettingModel): Instance of `UserSettingsModel`.

        Returns:
            dict: Return the `UserSettingsModel` as dict.
        """
        return {
            'identifier': instance.identifier,
            'user_id': instance.user_id,
            'setting': UserSettingPayload.to_dict(instance.setting),
            'setting_type': instance.setting_type.value,
            'setting_time': instance.setting_time.isoformat()
        }
