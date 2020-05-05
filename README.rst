=======
DrfXios
=======

**DrfXios** simplifies communication between frontend and Django Rest Framework API.

Quick start
-----------

>>> pip install django-drfxios

**settings.INSTALLED_APPS**

.. code-block:: python

    INSTALLED_APPS = [
        ...
        'drfxios',
        ...
    ]

**settings.py**

.. code-block:: python

    DRFXIOS_ROUTER_PATH = "<dotted.path.to.router>" # eg "api.urls.router"

**context_processors**

.. code-block:: python

    TEMPLATES = [
        {
            ...
            'OPTIONS': {
                'context_processors': [
                    ...
                    'drfxios.context_processors.drfxios',
                    ...
                ],
            },
        },
    ]








**base.html**

.. code-block:: django

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/url-join@4.0.1/lib/url-join.min.js"></script>
    <script src="{% static "drfxios/drfxios.js" %}"></script>

    <script>
        dx = new DrfXios('api', {{ DRFXIOS.MODEL_LIST|safe }})
    </script>

And you're ready tu use DrfXios in your templates.

Example::

    dx.getModel(<pk>)
    dx.createModel(<data:obj>)
    dx.deleteModel(<pk>)
    dx.getModelList(<filter:obj>)
    dx.updateModel(<data:obj>)
    dx.patchModel(<data:obj>)

All methods return JavaScript promises so you can use `.then`, `.catch` and `.finally` methods.