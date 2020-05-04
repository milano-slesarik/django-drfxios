import json

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.utils.module_loading import import_string


def drfxios(request):
    DRFXIOS_ROUTER_PATH = getattr(settings, 'DRFXIOS_ROUTER_PATH', None)
    if not DRFXIOS_ROUTER_PATH:
        raise ImproperlyConfigured("No DRFXIOS_ROUTER_PATH attr inside settings.py")
    router = import_string(DRFXIOS_ROUTER_PATH)
    r = router.registry
    models_list = [x[0] for x in r]
    return {
        'DRFXIOS': {
            'MODELS_LIST': json.dumps(models_list)
        }
    }
