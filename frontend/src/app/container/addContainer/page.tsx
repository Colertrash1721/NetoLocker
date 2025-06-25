import FormLayout from "@/components/addContainer/formLayout";
import SocialIcons from "@/components/ui/socialBar";
import React from "react";

export default function page() {
  return (
    <section className="flex flex-col items-center h-full justify-center bg-gray-100 dark:bg-[#13151bea]">
      <FormLayout />
      <SocialIcons />
    </section>
  );
}
