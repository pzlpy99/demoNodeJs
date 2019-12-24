import sys
sys.path.append('..')
import matplotlib.pyplot as plt
import math
import numpy as np
import json
from lib.core_config import *

# th_dict: a score to distance map, like {95:5451.60, 90:5728.92}
# we define 0 score point to infinity, and 100 score point to 0 distance
# th_dict[0] = c / distance
# th_dict[100] = 0


def dist2scoreEmodel(distance, th_dict):
    th = sorted(th_dict)
    if distance >= th_dict[th[0]]:
        alpha = th[0] * th_dict[th[0]]
        return alpha / distance
    
    tar = 0
    for jdx, j in enumerate(th):
        if distance > th_dict[j]:
            tar = jdx
            break
    dist_diff = th_dict[th[tar - 1]] - th_dict[th[tar]]
    score_diff = th[tar] - th[tar - 1]
    prev_score = th[tar - 1]
    prev_dist = th_dict[th[tar - 1]]
    score = prev_score + score_diff * (prev_dist - distance) / dist_diff
    return score


def score2distEmodel(score, th_dict):
    th = sorted(th_dict)
    if score <= th[0]:
        alpha = th[0] * th_dict[th[0]]
        return alpha / score
    
    tar = 0
    for jdx, j in enumerate(th):
        if score < j:
            tar = jdx
            break
    dist_diff = th_dict[th[tar - 1]] - th_dict[th[tar]]
    score_diff = th[tar] - th[tar - 1]
    prev_score = th[tar - 1]
    prev_dist = th_dict[th[tar - 1]]
    distance = prev_dist - dist_diff * (score - prev_score) / score_diff
    return distance


sigmoid9 = {"Alpha": 1.2342409,
            "Beta": -3.5774133, }
sigmoid10 = {"Alpha": 1.2342409,
             "Beta": -3.5774133, }
sigmoid13 = {"Alpha": 0.0011049662,
             "Beta": -3.6934764, }
sigmoid17 = {"Alpha": 0.00059517514,
             "Beta": -3.69574, }
sigmoid23 = {"Alpha": 0.0012103074,
             "Beta": -3.4727666, }
sigmoid24 = {"Alpha": 0.000579573,
             "Beta": -3.4411025, }
sigmoid32 = {"Alpha": 0.0012132416,
             "Beta": -3.4558904, }
sigmoid38 = {"Alpha": 0.000761658,
             "Beta": -3.5265038, }
sigmoid41 = {"Alpha": 0.0010185075,
             "Beta": -3.901589, }
sigmoid1006 = {"Alpha": 0.0005003905826495083,
               "Beta": -3.5498844073883324, }
sigmoid1106 = {"Alpha": 0.0004522624029637386,
               "Beta": -3.9215416796734095, }
sigmoid1206 = {"Alpha": 0.0005303517658432676,
               "Beta": -4.112154407574615, }
sigmoid1306 = {"Alpha": 0.0005363434204789966,
               "Beta": -4.241393293690473, }
sigmoid1506 = {"Alpha": 0.0005480365019083386,
               "Beta": -4.290811652299107, }
sigmoid1606 = {"Alpha": 0.000020693494513273002,
               "Beta": -3.7501678730847914, }


def dist2scoreL2Sigmoid(distance, alpha, beta):
    score = 100.0 / (1 + math.exp(alpha * distance + beta))
    return score


def score2distL2Sigmoid(score, alpha, beta):
    distance = ((math.log((100.0 / score) - 1)) - beta) / alpha
    return distance

def sciencematchscore(path1,path2):
    e_model_dict = {100: 0, 95: 4430.7, 90: 5180.0, 85: 5902.3, 80: 6224.1, 75: 6541.1,
                    70: 6828.5, 65: 7257.3, 60: 7698.1, 55: 8178.6, 50: 8746.6}
    with open(path1+"/result_form",'r') as f:
        result_form1 = json.loads(f.read())
    with open(path2+"/result_form",'r') as f:
        result_form2 = json.loads(f.read())
    not_match = []
    count = 0
    result = {1:0,2:0,3:0,4:0,5:0}
    more_5_image = {}
    for key in result_form1["recorded"].keys():
        if key in result_form2["recorded"].keys():
            for alert in result_form1["recorded"][key]["alert"]:
                for alert2 in result_form2["recorded"][key]["alert"]:
                    for alertid in alert.keys():
                        for alertid2 in alert2.keys():
                            if alert[alertid]["target"] == alert2[alertid2]["target"]:
                                count+=1
                                if not math.isclose(dist2scoreEmodel(score2distL2Sigmoid(alert[alertid]["score"], sigmoid1506["Alpha"], sigmoid1506["Beta"]), e_model_dict), alert2[alertid2]["score"], abs_tol=1):
                                    print(dist2scoreEmodel(score2distL2Sigmoid(alert[alertid]["score"], sigmoid1506["Alpha"], sigmoid1506["Beta"]), e_model_dict),alert2[alertid2]["score"])
                                    not_match.append([alert,alert2])
                                    for n in result.keys():
                                        if abs(dist2scoreEmodel(score2distL2Sigmoid(alert[alertid]["score"], sigmoid1506["Alpha"], sigmoid1506["Beta"]), e_model_dict)-alert2[alertid2]["score"]) >= n:
                                            result[n]+=1
                                            if n >=5:
                                                more_5_image[key] = alert[alertid]["target"]
    print("共进行%d次比对，其中%d次失败" % (count,len(not_match)))
    print(result)
    # print(more_5_image)
    with open("notmatch","w") as f:
        f.write(json.dumps(not_match))
    with open("more_5_image","w") as f:
        f.write(json.dumps(more_5_image))

if __name__ == "__main__":
    e_model_dict = {100: 0, 95: 4430.7, 90: 5180.0, 85: 5902.3, 80: 6224.1, 75: 6541.1,
                    70: 6828.5, 65: 7257.3, 60: 7698.1, 55: 8178.6, 50: 8746.6}
    print(dist2scoreEmodel(score2distL2Sigmoid(80, sigmoid1506["Alpha"], sigmoid1506["Beta"]),
                           e_model_dict))
    # print(dist2scoreL2Sigmoid(score2distEmodel(93,e_model_dict), sigmoid1506["Alpha"], sigmoid1506["Beta"]))
    # sciencematchscore(CORE_CONFIG.path["main_path"]+"190515/master-ee7aa40d-build167240/temporary_file_wuju-r-E-match-score/temporary_file",CORE_CONFIG.path["main_path"]+"190515/master-e2b17a31-build169835/temporary_file_wuju-r-science-match-score-GPU/temporary_file")

# def main():
#     e_model_dict = {100: 0, 83.5: 4867.4, 80.9: 5192.5, 78.2: 5496.1, 75.0: 5822.7, 71.1: 6185.2,
#                     64.9: 6591.0, 59.1: 7017.3, 52.4: 7492.6, 44.9: 8011.1, 36.6: 8607.4}
#     score_list = []
#     dist_list = []
#     for idx in range(0, 100000):
#         dist = idx
#         score = dist2scoreEmodel(idx, e_model_dict)
#         dist2 = score2distEmodel(score, e_model_dict)
#         if not math.isclose(dist, dist2, abs_tol=0.00001):
#             print("error dist1 %f dist2 %f score %f", dist, dist2, score)
#             return
#         dist_list.append(idx)
#         score_list.append(score)
#     # plt.plot(score_list, dist_list)
#     # plt.show()
#
#     for score in np.arange(0.1, 100.0, 0.1):
#         distance = score2distL2Sigmoid(score, sigmoid1506["Alpha"], sigmoid1506["Beta"])
#         score2 = dist2scoreL2Sigmoid(distance, sigmoid1506["Alpha"], sigmoid1506["Beta"])
#         if not math.isclose(score, score2, abs_tol=0.00001):
#             print("error core1 %f score2 %f dist %f", score, score2, distance)
#             return
#         dist_list.append(distance)
#         score_list.append(score)
#     # plt.plot(score_list, dist_list)
#     # plt.show()
#     # print(dist2scoreL2Sigmoid(score2distEmodel(75, e_model_dict), sigmoid1306["Alpha"], sigmoid1306["Beta"]))
#     scores = []
#     scores2 = []
#     for score in np.arange(50, 99.0, 0.1):
#         scores.append(score)
#         scores2.append(dist2scoreL2Sigmoid(score2distEmodel(score, e_model_dict), sigmoid1506["Alpha"], sigmoid1506["Beta"]))
#     plt.plot(scores, scores2)
#     plt.show()
#
# main()

