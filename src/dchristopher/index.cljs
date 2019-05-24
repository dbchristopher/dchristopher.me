(ns dchristopher.index
  (:require [reagent.core :as reagent :refer [atom]]
            [dchristopher.components.form :as form]))

(defn hello-world []
  [:div
   [:div.content-wrapper
    [:h1.name "Daniel Christopher"]
    [:p.statement "React developer, wannabe chef, occasional artist, and clojure fanboy."]]

   [:div.display-wrapper
    [:h1.display.javascript "Javascript"]
    [:h1.display.engineer "Engineer"]]

   [:div.content-wrapper
    [:div.history
     [:h2 "A Brief History"]

     [:p "A web Engineer with 15 years of technical experience, I’ve focused primarily on
          front-end technologies, including React, Redux, HTML5/SCSS, and ES6. I’m self-motivated
          and comfortable working independently on roughly spec’d projects, but I’m still
          easygoing and love to collaborate with others."]

     [:p "Major themes in my work history include the intersection of technology and user
          experience, as well as data-driven optimizations."]]] [:div.content-wrapper
                                                                 [:div.experiments
                                                                  [:h2 "Experiments"]
                                                                  [:ul
                                                                   [:li
                                                                    [:a {:href "http://labs.uxmonk.com/simon-says/"} "Simon Says: Memory Match Game"]]
                                                                   [:li
                                                                    [:a {:href "https://www.spymaster.rocks"} "Spymaster Word Game"]]]]]

   [:div.content-wrapper
    [:h2 "Say Hello!"]

    [:div.links
     [:a {:href "/assets/resume-public.pdf" :download true} "Resume"]
     [:span "|"]
     [:a {:href "https://www.github.com/dbchristopher"} "Github"]
     [:span "|"]
     [:a {:href "https://twitter.com/danchristopher"} "Twitter"]
     [:span "|"]
     [:a {:href "https://www.instagram.com/dxchristopher"} "Instagram"]]
    [:div (form/contact)]]])

