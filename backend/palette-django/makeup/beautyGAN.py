import tensorflow as tf
import numpy as np
import os
import glob
from PIL import Image
import cv2
import argparse

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

parser = argparse.ArgumentParser()
parser.add_argument('--no_makeup', type=str, default=os.path.join('C:/Users/SSAFY/Downloads/Cosmetic-AI-DL--Program/imags', 'no_makeup', 'image.png'), help='path to the no_makeup image')
args = parser.parse_args()

def preprocess(img):
    return (img / 255. - 0.5) * 2

def deprocess(img):
    return (img + 1) / 2

batch_size = 1
img_size = 256
no_makeup = cv2.resize(cv2.imread(args.no_makeup), (img_size, img_size))
no_makeup_rgb = cv2.cvtColor(no_makeup, cv2.COLOR_BGR2RGB)
X_img = np.expand_dims(preprocess(no_makeup_rgb), 0)
makeups = glob.glob(os.path.join('C:/Users/SSAFY/Downloads/Cosmetic-AI-DL--Program/imags', 'makeup', 'maxresdefault.jpg'))

result = np.ones((2 * img_size, (len(makeups) + 1) * img_size, 3), dtype=np.uint8)
result[img_size: 2 * img_size, :img_size] = no_makeup_rgb

with tf.compat.v1.Session() as ses:
    ses.run(tf.compat.v1.global_variables_initializer())
    saver = tf.compat.v1.train.import_meta_graph(
        os.path.join('C:/Users/SSAFY/Downloads/Cosmetic-AI-DL--Program/model', 'model.meta'))
    saver.restore(ses, tf.compat.v1.train.latest_checkpoint('C:/Users/SSAFY/Downloads/Cosmetic-AI-DL--Program/model'))

    graph = tf.compat.v1.get_default_graph()
    X = graph.get_tensor_by_name('X:0')
    Y = graph.get_tensor_by_name('Y:0')
    Xs = graph.get_tensor_by_name('generator/xs:0')

    for i in range(len(makeups)):
        makeup = cv2.resize(cv2.imread(makeups[i]), (img_size, img_size))
        makeup_rgb = cv2.cvtColor(makeup, cv2.COLOR_BGR2RGB)
        Y_img = np.expand_dims(preprocess(makeup_rgb), 0)

        Xs_ = ses.run(Xs, feed_dict={X: X_img, Y: Y_img})
        Xs_ = deprocess(Xs_)
        Image.fromarray((Xs_[0] * 255).astype(np.uint8)).save('C:/Users/SSAFY/Downloads/Cosmetic-AI-DL--Program/result/result1.jpg')
        # result[:img_size, (i + 1) * img_size: (i + 2) * img_size] = makeup_rgb
        # result[img_size: 2 * img_size, (i + 1) * img_size: (i + 2) * img_size] = (Xs_[0] * 255).astype(np.uint8)
    # Image.fromarray(result).save('C:/Users/SSAFY/Desktop/pjt/AI-study/Cosmetic-AI-DL--Program/result.jpg')
