from cmdb.object_framework.cmdb_dao import CmdbDAO, RequiredInitKeyNotFoundError
from cmdb.object_framework.cmdb_object_field_type import CmdbFieldType
from datetime import datetime
from cmdb.utils import get_logger

LOGGER = get_logger()


class CmdbType(CmdbDAO):
    """
    Definition of an object input_type - which fields were created and how.
    """
    COLLECTION = "objects.types"
    SCHEMA = "input_type.schema.json"
    REQUIRED_INIT_KEYS = [
        'name',
        'active',
        'author_id',
        'creation_time',
        'active',
        'render_meta',
    ]

    def __init__(self, name: str, description: str, active: bool, author_id: int, creation_time: datetime,
                 render_meta: list, fields: list, version: str = '1.0.0', label: str=None, status: list = None, logs: dict = None,
                 **kwargs):
        self.name = name
        self.label = label or self.name.title()
        self.description = description
        self.version = version
        self.status = status
        self.active = active
        self.author_id = author_id
        self.creation_time = creation_time
        self.render_meta = render_meta
        self.fields = fields or []
        self.logs = logs
        super(CmdbType, self).__init__(**kwargs)

    def get_name(self):
        return self.name

    def get_label(self):
        return self.label

    def get_description(self):
        return self.description

    def get_externals(self):
        return self.render_meta['external']

    def get_external(self, _id):
        try:
            return self.render_meta['external'][_id]
        except IndexError:
            return None

    def get_summaries(self):
        return self.render_meta['summary']

    def get_summary(self, _id):
        try:
            return self.render_meta['summary'][_id]
        except IndexError:
            return None

    def get_sections(self):
        return sorted(self.render_meta['sections'], key=lambda k: k['position'])

    def get_section(self, _id):
        try:
            return self.render_meta['sections'][_id]
        except IndexError:
            return None

    def get_fields(self):
        """
        get all fields
        :return: list of fields
        """
        return self.fields

    def get_field(self, name):
        """
        get specific field
        :param name: field name
        :return: field with value
        """
        for field in self.fields:
            if field['name'] == name:
                try:
                    return CmdbFieldType(**field)
                except RequiredInitKeyNotFoundError as e:
                    LOGGER.warning(e.message)
                    return None
        raise FieldNotFoundError(name, self.get_name())


class FieldNotFoundError(Exception):
    """
    Error if field do not exists
    """

    def __init__(self, field_name, type_name):
        super().__init__()
        self.message = 'Field {} was not found inside input_type: {}'.format(field_name, type_name)