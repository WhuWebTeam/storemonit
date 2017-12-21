# WEB DEVELOP STANDARD


1. API standard ([restful style](http://www.ruanyifeng.com/blog/2014/05/restful_api.html))
    
    * back-end => front-end:
        
        get (query info): 

        ```js
        
        // request successed
        // /api/v1/areas/info/areas
        {
            "code": 200,
            "data": [
                {
                    "id": "027",
                    "name": "武汉",
                    "details": "武汉"
                },
                {
                    "id": "010",
                    "name": "北京",
                    "details": "北京"
                }
            ]
        }

        // /api/v1/areas/info/areas/:areaId
        {
            "code": 200,
            "data": {
                "id": "010",
                "name": "北京",
                "details": "北京"
            }
        }

        
        // request failed
        {
            "code": 400,
            "message": "xxxxxxx failed"
        }

        ```



    put | post (modify record info | add new record info)

    ```js

    // request successed
    {
        "code": 203,
        "data": {
            "info": "xxxxxx successed"
        }
    }

    
    // request failed
    {
        "code": 403,
        "message": "xxxxxx failed"
    }

    ```



    delete (delete some record info)

    ```js
    // request successed
    {
        "code": 204,
        "data": {
            "info": "xxxxxx successed"
        }
    }


    // request failed
    {
        "code": 404,
        "message": "xxxxxxx failed"
    }

    ```
   


