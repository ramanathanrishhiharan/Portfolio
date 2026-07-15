import React from "react";
import {Hero} from "@/components/HR/Hero";
import { LeadForm } from "@/components/LeadForm";
import { OutcomesMarquee } from "@/components/HR/Infinite";


const page = () => {
  return (
    <div>
      <Hero />
      <OutcomesMarquee/>
      <LeadForm/>

    </div>
  );
};

export default page;
