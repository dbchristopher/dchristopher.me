(ns dchristopher.index
  (:require [reagent.core :as reagent :refer [atom]]
            [dchristopher.components.form :as form]))

(defn hello-world []
  [:div
   [:h1 "Daniel Christopher"]
   [:h3 "Front end engineer, father, wannabe chef, occasional artist, and clojure fanboy."]
   [:div.links
    [:a {:href "/assets/resume-public.pdf" :download true} "Resume"]
    [:span "|"]
    [:a {:href "https://www.github.com/dbchristopher"} "Github"]
    [:span "|"]
    [:a {:href "https://twitter.com/danchristopher"} "Twitter"]
    [:span "|"]
    [:a {:href "https://www.instagram.com/dxchristopher"} "Instagram"]]
   [:div (form/contact)]])

