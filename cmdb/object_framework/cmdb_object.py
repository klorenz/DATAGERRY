from cmdb.object_framework.cmdb_dao import CmdbDAO, CMDBError
from datetime import datetime


class CmdbObject(CmdbDAO):
    """The CMDB object is the basic data wrapper for storing and holding the pure objects within the CMDB.
    """

    COLLECTION = 'objects.data'
    REQUIRED_INIT_KEYS = [
        'type_id',
        'version',
        'creation_time',
        'author_id',
        'last_edit_time',
        'active',
        'views',
        'fields',
        'logs'
    ]

    def __init__(self, type_id, status, creation_time, author_id, last_edit_time, active, fields, logs,
                 views: int = 0, version: str = '1.0.0', **kwargs):
        """init of object

        Args:
            type_id: public input_type id which implements the object
            version: current version of object
            creation_time: date of object creation
            author_id: public id of author
            last_edit_time: last date of editing
            active: object activation status
            views: numbers of views
            fields: data inside fields
            logs: object log
            **kwargs: additional data
        """
        self.type_id = type_id
        self.status = status
        self.version = version
        self.creation_time = creation_time
        self.author_id = author_id
        self.last_edit_time = last_edit_time
        self.active = active
        self.views = views
        self.fields = fields
        self.logs = logs
        super(CmdbObject, self).__init__(**kwargs)

    def get_type_id(self) -> int:
        """get input_type if of this object

        Returns:
            int: public id of input_type

        """
        if self.type_id == 0 or self.type_id is None:
            raise TypeNotSetError(self.get_public_id())
        return self.type_id

    def update_view_counter(self) -> int:
        """update the number of times this object was viewed

        Returns:
            int: number of views

        """
        self.views += 1
        return self.views

    def get_all_fields(self) -> list:
        """ get all fields with key value pair

        Returns:
            all fields

        """

        return self.fields

    def get_value(self, field) -> str:
        """get value of an field

        Args:
            field: field_name

        Returns:
            value of field
        """
        for f in self.fields:
            if f['name'] == field:
                return f['value']
            continue
        return None

    def empty_logs(self) -> bool:
        if len(self.logs) > 0:
            return True
        return False

    def last_log(self):
        try:
            last_log = CmdbObjectLog(**self.logs[-1])
        except CMDBError:
            return None
        return last_log


class CmdbObjectLog:
    POSSIBLE_COMMANDS = ('create', 'edit', 'delete')

    def __init__(self, editor: id, _action: str, message: str, date: str, log: str):
        self.editor = editor
        self.action = _action
        self.message = message
        self.date = date or datetime.today()
        self.log = log

    def get_date(self) -> datetime:
        return self.date

    @property
    def action(self) -> str:
        return self._action

    @action.setter
    def action(self, value: str):
        if value not in CmdbObjectLog.POSSIBLE_COMMANDS:
            raise ActionNotPossibleError(value)
        self._action = value

    def __repr__(self):
        from cmdb.utils.helpers import debug_print
        return debug_print(self)


class ActionNotPossibleError(CMDBError):

    def __init__(self, action):
        super().__init__()
        self.message = 'Object log could not be set - wrong action {}'.format(action)


class TypeNotSetError(CMDBError):

    def __init__(self, public_id):
        super().__init__()
        self.message = 'The object (ID: {}) is not connected with a input_type'.format(public_id)


class NoLinksAvailableError(CMDBError):
    """
    @deprecated
    """

    def __init__(self, public_id):
        super().__init__()
        self.message = 'The object (ID: {}) has no links'.format(public_id)