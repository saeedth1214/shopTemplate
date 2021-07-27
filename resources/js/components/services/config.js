const config = {
    "TOKEN_API": {
        "headers": {
            "Authorization": ""
        },
        "token_type": "Bearer "
    },
    "BASE_URL": "http://shopTemplate.test:8080/",
    "BASE_IMG_PATH": "http://shopTemplate.test:8080/storage/images/",
    "BASE_DEFAULT_IMG_PATH": "http://shopTemplate.test:8080/storage/images/noimage.png",
    "ADD_DAY": 86400,
    "ADD_WEEK": 604800,
    "TYPE_OF_ATTRIBUTES": [
        {
            "integer": "عدد صحیح"
        },
        {
            "float": "عدد اعشاری"
        },
        {
            "tinytext": "متن کوچک"
        },
        {
            "bigtext": "متن بزرگ"
        }
    ],
    "TYPE_OF_IMAGE": [
        {
            "product_image": "تصویر عادی"
        },
        {
            "slider_image": "اسلاید صفحه نخست"
        }
    ]
}

export default config;
