import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import React from "react";

const faqs = [
  {
    question: "Why Us?",
    answer:
      "We have been on the market for 5 years and we can proudly say that we offer one of the largest available ranges of products available immediately. Thanks to this, we can provide fast transaction service, and attractive prices make our offer even more beneficial for our customers. Our company also enjoys numerous positive opinions, which confirms our reliability and professionalism.",
  },
  {
    question: "Are all items original?",
    answer:
      "We guarantee that you will find only original sneakers in the Aplug store and online store. Our wide and reliable network of partners allows us to buy only original sneakers, the origin of which we can document. Our experienced team thoroughly examines each shoe we receive before placing it in the store and online store. Thanks to this, we are 100% sure that only original sneakers are available in our offer. Over the years of our activity, we have developed extensive contacts both in Europe and beyond, which additionally strengthens our position on the market and ensures access to authentic products.We guarantee that you will find only original sneakers in the Aplug store and online store. Our wide and reliable network of partners allows us to buy only original sneakers, the origin of which we can document. Our experienced team thoroughly examines each shoe we receive before placing it in the store and online store. Thanks to this, we are 100% sure that only original sneakers are available in our offer. Over the years of our activity, we have developed extensive contacts both in Europe and beyond, which additionally strengthens our position on the market and ensures access to authentic products.",
  },
  {
    question: "How do we access limited and sold out products?",
    answer:
      "All products at Aplug come directly from our network of retail and professional partners. We specialize in limited-edition products that sell out quickly from stores and traditional online stores. Our mission is to provide you with access to fully original products in a safe way. By working with a network of retailers, individuals and professionals in Europe, we are able to provide you with these unique products, even after their premiere.",
  },
  {
    question:
      "Where can I contact you to get more information about the product or find out when new products are available?",
    answer:
      "We kindly invite you to contact us by email or through our social media to obtain additional information about products or information about the appearance of new products. All necessary information, including email address and social media linksWe kindly invite you to contact us by email or through our social media to obtain additional information about products or information about the appearance of new products. All necessary information, including email address and social media links.",
  },
  {
    question: "What causes price differences depending on size?",
    answer:
      "Prices vary by size mainly due to supply and demand. Rarer or more popular sizes may be more expensive due to market availability. Our goal is always to offer competitive prices that reflect market realities and customer needs.",
  },
  {
    question:
      "Will I find the same products in a brick-and-mortar store as in an online store?",
    answer:
      "Products marked as 48H are usually available in our brick-and-mortar stores in Łódź and Gdańsk. All products visible in the online store can be ordered, but not all are available in our stores in Łódź and Gdańsk.",
  },
];

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto  min-h-screen px-4 space-y-10 py-12 ">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-center">
          Frequently Asked Questions
        </h1>
        <h2 className="text-center text-gray-500 mb-20 text-sm">
          We have collected answers to all frequently asked questions here.
          However, if you cannot find what you are looking for, please contact
          us - we will try to dispel all doubts.
        </h2>
      </div>

      <Card className="divide-y ">
        {faqs.map((item, idx) => (
          <Collapsible key={idx} className="w-full">
            <CollapsibleTrigger className="w-full p-4  text-left hover:bg-gray-100 transition">
              <span className="font-medium text-base">{item.question}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-4 text-sm text-gray-600">
              {item.answer}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </Card>
    </div>
  );
}
