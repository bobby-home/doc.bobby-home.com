# Tensorflow
To know if a human is present on a frame we use the Tensorflow object detection API with a model.


This is very different and more powerful from some other alarm system that uses traditional image processing and/or motion sensors *(usually using Passive infrared sensor)*. With this solution we do not have basic noise that could trigger the alarm:
- your pet moving.
- huge variation of light.
- if you monitor your courtyard: birds and all sorts of animals.
- ...

::: tip
The system monitores 4 courtyards and 3 homes since January 2020 without **any** false positive.
:::

## The model and data provenance
We use a pre-trained model hosted/given by the Tensorflow team. *[You can download it here.](http://storage.googleapis.com/download.tensorflow.org/models/tflite/coco_ssd_mobilenet_v1_1.0_quant_2018_06_29.zip)*.

Sadly the documentation for this model is gone. Here are some useful informations:

- Model name: **SSD MobileNet**
  - Description: This model uses 80 categories from the COCO image dataset to detect objects.
- References
    - [Tensorflow Object Detection API.](https://github.com/tensorflow/models/tree/master/research/object_detection)
    - Paper by Microsoft: COCO: [Common Objects in Context](https://arxiv.org/abs/1405.0312)    
    - [COCO website.](http://cocodataset.org/#home)
- Sources
    - We use a detection model pre-trained on the COCO 2017 dataset by Tensorflow. [You can find a list of models here.](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md)
    - We use the SSD mobilenet v2 coco17 because only **SSD models are supported by Tensorflow Lite** *(at the middle of 2020)*, which could be handy in the future and this is a very performant model. ["NOTE: TFLite currently only supports SSD Architectures (excluding EfficientDet) for boxes-based detection. Support for EfficientDet is coming soon."](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/running_on_mobile_tf2.md).
    - [Example to run tf lite on a raspberry pi given by tf.](https://github.com/tensorflow/examples/tree/master/lite/examples/object_detection/raspberry_pi)

The output model has the following inputs & outputs:
```
One input:
  image: a float32 tensor of shape[1, height, width, 3] containing the
  *normalized* input image.
  NOTE: See the `preprocess` function defined in the feature extractor class
  in the object_detection/models directory.

Four Outputs:
  detection_boxes: a float32 tensor of shape [1, num_boxes, 4] with box
  locations
  detection_classes: a float32 tensor of shape [1, num_boxes]
  with class indices
  detection_scores: a float32 tensor of shape [1, num_boxes]
  with class scores
  num_boxes: a float32 tensor of size 1 containing the number of detected boxes
```

:::tip
The goal would be to train the model only on labels that we actually use: human and maybe a few more in the future. But I don't have the hardware requirements. Still, it works like a charm and does not even burn your RaspberryPi!
:::

:::tip
We tried others SSD models but the results look the same *(performance/accuracy)*.
:::

## Where is the code?
You can find all related code in the folder `object_detection` of the `smart-camera`. This folder is **totally** independant from the rest of the software.


To change the model:
Go to `download_model.py`, change the URL and the hash. Be sure outputs of the model are the same! Expected inputs/outputs are documented above.

:::danger
If you don't change the hash, then the system will keep the old model because the hash corresponds to the local file.
:::
