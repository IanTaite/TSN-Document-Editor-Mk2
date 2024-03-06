export const SAMPLE_DATA = {
  "id": "example-1ytm1p",
  "name": "Example",
  "clientId": "test",
  "imageSizeTemplateId": "image-template id",
  "outputImageType": 2,
  "integrity": "\"060010c6-0000-0c00-0000-65e5b52c0000\"",
  "variantKeys": [],
  "imageLayers": [
    {
      "layerType": 1,
      "layerPosition": 0,
      "components": [
        {
          "paths": [
            {
              "name": "default-image",
              "path": "default-image.jpg"
            }
          ],
          "componentType": 1,
          "position": {
            "x": 0,
            "y": 0,
            "width": 1208,
            "height": 1208
          },
          "variants": []
        }
      ],
      "dataSet": null,
      "defaultImage": null,
      "useVariantKeys": false
    },
    {
      "layerType": 2,
      "layerPosition": 1,
      "components": [
        {
          "defaultText": "default text",
          "textFormat": "{dataSetValue}",
          "sets": [
            {
              "setAccount": "keyrings",
              "setName": "keyring_this_human_belongs_to_name"
            }
          ],
          "componentType": 2,
          "position": {
            "x": 0,
            "y": 0,
            "width": 1208,
            "height": 1208
          },
          "variants": []
        }
      ],
      "dataSet": {
        "name": "data set name"
      },
      "defaultImage": {
        "files": [
          {
            "name": "default-image",
            "path": "default.png"
          }
        ]
      },
      "useVariantKeys": false
    }
  ]
};
