"""
Net|CMDB is a flexible asset management tool and
open-source configurable management database

You should have received a copy of the MIT License along with Net|CMDB.
If not, see <https://github.com/markheumueller/NetCMDB/blob/master/LICENSE>.
"""
from cmdb.communication_interface import HTTPServer, WEB_APP
if __name__ == "__main__":
    server = HTTPServer(WEB_APP, options = {
        'bind': '%s:%s' % ('127.0.0.1', '8080'),
    })
    server.run()
