# WEB DEVELOP STANDARD


1. API standard ([restful style](http://www.ruanyifeng.com/blog/2014/05/restful_api.html))
    
    * back-end => front-end:
        
        get: 

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


   


