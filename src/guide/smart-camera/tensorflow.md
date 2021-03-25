# Tensorflow

- https://www.tensorflow.org/lite/guide/python
- https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf1_detection_zoo.md#mobile-models to find models to download.
- https://www.tensorflow.org/lite/guide/hosted_models anoter list of models for object detection with tensorflow lite.
- https://github.com/tensorflow/examples/tree/master/lite/examples/object_detection/raspberry_pi

We use a model that is not documented anywhere in the Tensorflow documentation.

I tried a model that is present on the documentation and the cpu performances looked to be the same, and also the accuracy. As the system works for months with the current model, we didn't change it.

Mobilenet_V2_1.0_224_quant	paper, tflite&pb	3.4 Mb	70.8%	89.9%	12 ms	6.9 ms

https://www.tensorflow.org/lite/guide/hosted_models


To change the model:
Go to `download_model.py`, change the URL and the hash.

:::danger
If you don't change the hash, then the system will keep the old model because the hash corresponds to the local file.
:::