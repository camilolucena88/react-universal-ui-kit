import React, {useEffect, useState} from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import {Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent} from "../../../../components/ui/card";
import { Check } from "lucide-react"
import {Button} from "../../../../components/ui/button";

type PlanFeature = {
  icon: string;
  text: string;
};

type Plan = {
  id: string;
  title: string;
  price: number;
  short_description?: string; // ✅ Made it optional
  features: PlanFeature[];
};

type GroupPricesProps = {
  groupedIds: string[];
  tabTitles: string[];
  lang: string;
  url?: string; // Optional in case it's undefined
  PromotionsTitle?: string;
  buttonMsg?: string;
};

export default function GroupPrices({
                                        groupedIds,
                                        tabTitles,
                                        lang,
                                        url,
                                        PromotionsTitle,
                                        buttonMsg = "Select Plan"
                                    }: GroupPricesProps) {
    const [groupedData, setGroupedData] = useState<Plan[][]>([]);
    const [tabType, setTabType] = useState<string>("tab-0"); // Default to the first tab title


  // Default to current domain if no URL is provided
  const baseURL = url || window.location.origin || "http://localhost:8000";


  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        const language = lang ?? "en";
        const promises = groupedIds.map(async (ids: string) => {
          const response = await fetch(`${baseURL}/api/v1/promotions/?ids=${ids}`, {
            method: 'GET',
            headers: {
              'Accept-Language': language,
              'Content-Type': 'application/json'
            }
          });
          return response.json();
        });

        const results = await Promise.all(promises);
        setGroupedData(results); // Store all group data
      } catch (error) {
          console.error("Error fetching promotions:", error);
      }
    };

    fetchAllGroups();
  }, [groupedIds, baseURL, lang]);

    const handlePlanSelect = (plan: Plan) => {
        const event = new CustomEvent('planSelected', {
            bubbles: true,
            detail: {
                plan,
                tabType,
                timestamp: new Date().toISOString()
            }
        });
        const groupPricesElement = document.querySelector(".group-prices-component");
        if (groupPricesElement) {
            groupPricesElement.dispatchEvent(event);
        }
    };

    const tabListClass = `grid sm:grid-cols-2 lg:grid-cols-${tabTitles.length} mb-8` ;

  return (
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
                {PromotionsTitle && (
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                    {PromotionsTitle}
                  </h2>
                )}
                <Tabs
                  defaultValue="tab-0" // Default to the first tab title
                  className="w-full"
                  onValueChange={(value) => setTabType(value)} // Update tabType when a tab is selected
                >
              <TabsList className={tabListClass}>
                {tabTitles.map((title, index) => (
                  <TabsTrigger key={index} value={`tab-${index}`}>{title}</TabsTrigger>
                ))}
              </TabsList>
            {groupedData.map((group, index) => (
            <TabsContent key={index} value={`tab-${index}`}>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((plan:Plan, idx:number) => (
                      <Card key={idx} className="flex flex-col">
                        <CardHeader>
                          <CardTitle>{plan.title}</CardTitle>
                          <CardDescription>{plan.short_description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <p className="text-3xl font-bold">€{plan.price}</p>
                          <ul className="mt-4 space-y-2">
                            {plan.features && plan.features.map((feature: PlanFeature, i:number) => (
                              <li key={i} className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-primary" /> {feature.text}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={() => handlePlanSelect(plan)} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            {buttonMsg}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
  )
}
