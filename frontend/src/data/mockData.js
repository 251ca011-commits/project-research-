/**
 * RESEARCH — Realistic Mock Dataset for Frontend Prototyping
 * NOTE: This is development mock data for demonstration purposes.
 * It is structured to mirror the future Node.js/Sequelize database schema.
 */

export const MOCK_CASES = [
  {
    case_id: 101,
    case_title: "Ananya Sundaram & Anr. v. Rajeshwar Sundaram & Ors.",
    case_number: "CA/4892/2024",
    case_type: "Civil - Succession & Partition",
    jurisdiction: "Madras High Court",
    bench: "Division Bench",
    date: "2024-03-15",
    status: "Active Research",
    short_description: "Daughter claiming retroactive equal coparcenary rights in Hindu Undivided Family (HUF) ancestral property despite father passing prior to 2005.",
    case_facts: {
      background: "The parties are governed by the Mitakshara school of Hindu Law. The ancestral estate consists of 4 commercial plots and agricultural holdings in Coimbatore district.",
      what_happened: "Upon the demise of the patriarch in 2001 without a registered partition, the male coparceners executed a unilateral settlement deed in 2004 excluding the plaintiff daughter.",
      parties: [
        { role: "Plaintiff / Appellant", name: "Ananya Sundaram (Daughter)", representation: "Senior Advocate K. Ramaswamy" },
        { role: "Respondent / Defendant", name: "Rajeshwar Sundaram & Brothers (Sons)", representation: "Advocate M. Chidambaram" }
      ],
      important_events: [
        { date: "1998-04-12", event: "Patriarch acquired ancestral assets via partition deed" },
        { date: "2001-11-04", event: "Patriarch passed away intestate" },
        { date: "2004-08-20", event: "Brothers executed unregistered oral family settlement" },
        { date: "2005-09-09", event: "Hindu Succession (Amendment) Act 2005 came into force" },
        { date: "2024-01-10", event: "Daughter instituted original suit for 1/3rd equal share" }
      ],
      key_circumstances: "The primary defense contends that the father was not alive on September 9, 2005, and an oral partition had allegedly crystallized earlier.",
      key_facts: [
        "No registered partition deed executed prior to December 20, 2004",
        "Father was deceased prior to the 2005 amendment enforcement date",
        "Property remains in joint possession of the extended family",
        "Plaintiff is the biological daughter born prior to 2005"
      ]
    },
    legal_issues: [
      {
        issue_id: 1,
        issue_text: "Whether the amended Section 6 of the Hindu Succession Act confers coparcenary status on daughters retroactively irrespective of whether the father was alive on September 9, 2005?",
        related_section: "Section 6, Hindu Succession Act 1956",
        precedent_count: 5
      },
      {
        issue_id: 2,
        issue_text: "Whether an unregistered oral family arrangement executed in 2004 qualifies as a valid partition under the Explanation to Section 6(5)?",
        related_section: "Section 6(5), Hindu Succession Act & Sec 17 Registration Act",
        precedent_count: 3
      }
    ],
    sections: [
      { section_id: 1, act_name: "Hindu Succession Act", section_number: "Section 6", section_title: "Devolution of interest in coparcenary property" },
      { section_id: 2, act_name: "Registration Act 1908", section_number: "Section 17", section_title: "Documents of which registration is compulsory" }
    ],
    precedents_count: 4,
    similarity_top_score: 95
  },
  {
    case_id: 102,
    case_title: "NexTech Logistics Pvt Ltd v. Vertex Data Solutions",
    case_number: "ARB/712/2023",
    case_type: "Commercial - Contract & Arbitration",
    jurisdiction: "Delhi High Court",
    bench: "Commercial Division",
    date: "2023-11-20",
    status: "Active Research",
    short_description: "Application under Section 34 challenging an arbitral award on grounds of patent illegality and violation of public policy in a SaaS service-level dispute.",
    case_facts: {
      background: "A 5-year cloud infrastructure service contract entered into in 2020 with guaranteed 99.95% uptime and liquidated damages clause.",
      what_happened: "Service suffered an outage for 72 hours; customer terminated contract and arbitrator awarded full multi-year prospective loss of profit.",
      parties: [
        { role: "Petitioner", name: "NexTech Logistics Pvt Ltd" },
        { role: "Respondent", name: "Vertex Data Solutions" }
      ],
      important_events: [
        { date: "2020-02-15", event: "Master Services Agreement executed" },
        { date: "2022-06-10", event: "Critical 72-hour system downtime occurred" },
        { date: "2023-04-18", event: "Sole Arbitrator rendered final award granting prospective damages" }
      ],
      key_circumstances: "Contract specifically capped consequential damages to the preceding 3 months of fees paid.",
      key_facts: [
        "Arbitrator ignored limitation of liability clause 14.2",
        "Award granted speculative consequential damages without documentary proof of loss"
      ]
    },
    legal_issues: [
      {
        issue_id: 3,
        issue_text: "Whether an arbitral award disregarding express contractual limitation of liability clauses suffers from patent illegality under Section 34(2A)?",
        related_section: "Section 34, Arbitration & Conciliation Act 1996",
        precedent_count: 6
      }
    ],
    sections: [
      { section_id: 3, act_name: "Arbitration & Conciliation Act 1996", section_number: "Section 34", section_title: "Application for setting aside arbitral award" },
      { section_id: 4, act_name: "Indian Contract Act 1872", section_number: "Section 73", section_title: "Compensation for loss or damage caused by breach of contract" }
    ],
    precedents_count: 5,
    similarity_top_score: 91
  },
  {
    case_id: 103,
    case_title: "Prime Steel Corporation v. Skyline Infra Developers",
    case_number: "CC/1402/2024",
    case_type: "Criminal - Negotiable Instruments",
    jurisdiction: "Bombay High Court",
    bench: "Single Bench",
    date: "2024-02-08",
    status: "Active Research",
    short_description: "Dishonor of cheques issued as security in high-value infrastructure procurement under Section 138 of the NI Act.",
    case_facts: {
      background: "Supply of 5,000 MT structural steel for metro rail viaduct construction.",
      what_happened: "Post-dated cheques presented upon invoice defaults; returned with memo 'Account Closed'.",
      parties: [
        { role: "Complainant", name: "Prime Steel Corporation" },
        { role: "Accused", name: "Skyline Infra Developers & Managing Director" }
      ],
      important_events: [
        { date: "2023-08-01", event: "Supply invoices raised and delivery verified" },
        { date: "2023-10-15", event: "Cheques deposited and dishonored" },
        { date: "2023-11-02", event: "Statutory 15-day legal notice served" }
      ],
      key_circumstances: "Accused argues cheques were given purely as advance security and debt was not crystallized.",
      key_facts: [
        "Invoices acknowledged and materials utilized in construction",
        "Statutory notice duly served within 30 days of dishonor memo"
      ]
    },
    legal_issues: [
      {
        issue_id: 4,
        issue_text: "Whether cheques issued as security in commercial transactions attract Section 138 liability when existing liability is established at time of presentation?",
        related_section: "Section 138 & 139, Negotiable Instruments Act 1881",
        precedent_count: 4
      }
    ],
    sections: [
      { section_id: 5, act_name: "Negotiable Instruments Act 1881", section_number: "Section 138", section_title: "Dishonour of cheque for insufficiency, etc., of funds in the account" },
      { section_id: 6, act_name: "Negotiable Instruments Act 1881", section_number: "Section 139", section_title: "Presumption in favour of holder" }
    ],
    precedents_count: 3,
    similarity_top_score: 93
  }
];

export const MOCK_JUDGMENTS = [
  {
    judgment_id: 501,
    case_name: "Vineeta Sharma v. Rakesh Sharma & Ors.",
    court: "Supreme Court of India",
    bench: "Arun Mishra, S. Abdul Nazeer, M.R. Shah, JJ.",
    date: "2020-08-11",
    citation: "(2020) 9 SCC 1 | 2020 INSC 483",
    outcome: "Allowed (Daughter's equal coparcenary rights affirmed retrospectively)",
    court_reasoning: "The Supreme Court held that the rights under amended Section 6 can be claimed by a daughter born prior to the amendment in the same manner as a son. The coparcenary status is conferred by birth and is an unobstructed heritage (apratibandha daya). Consequently, the living status of the father on September 9, 2005, is not a necessary condition.",
    important_findings: [
      "Daughters have equal coparcenary rights by birth under Section 6 as amended in 2005.",
      "The father coparcener does not need to be alive as of September 9, 2005.",
      "Unregistered oral family settlements cannot defeat statutory coparcenary claims unless registered prior to 20 December 2004.",
      "Overruled previous conflicting interpretations in Prakash v. Phulavati."
    ],
    sections_applied: ["Section 6, Hindu Succession Act 1956", "Section 17, Registration Act 1908"],
    source: {
      source_id: 1,
      source_name: "Official Supreme Court Judgments Portal (SCI)",
      source_url: "https://main.sci.gov.in/supremecourt/2018/32601/32601_2018_34_1501_23395_Judgement_11-Aug-2020.pdf",
      source_type: "Official Government Repository",
      verification_status: "Verified",
      verified_by: "Adv. K. Swaminathan (Senior Research Fellow)",
      verified_date: "2024-01-12",
      notes: "Full bench judgment certified from Supreme Court neutral citation registry."
    }
  },
  {
    judgment_id: 502,
    case_name: "Danamma @ Suman Surpur & Anr. v. Amar & Ors.",
    court: "Supreme Court of India",
    bench: "A.K. Sikri, Ashok Bhushan, JJ.",
    date: "2018-02-01",
    citation: "(2018) 3 SCC 343 | 2018 INSC 98",
    outcome: "Allowed (Partition suit decreed with daughter's share)",
    court_reasoning: "The Court held that Section 6 of the Act confers a substantive right in favor of the daughter. Even if the father passed away in 2001 prior to the amendment, during the pendency of the partition suit, the amended provisions apply to the final decree proceedings.",
    important_findings: [
      "Amended provisions apply even if father died before 2005 during pending partition proceedings.",
      "Daughter acquires status of coparcener by birth.",
      "Preliminary decree does not extinguish coparcenary status till final partition is executed."
    ],
    sections_applied: ["Section 6, Hindu Succession Act 1956"],
    source: {
      source_id: 2,
      source_name: "Indian Kanoon Legal Repository",
      source_url: "https://indiankanoon.org/doc/171578358/",
      source_type: "Certified Public Law Report",
      verification_status: "Verified",
      verified_by: "Adv. R. Meenakshi (High Court Bar)",
      verified_date: "2024-02-05",
      notes: "Verified against Official Supreme Court Reports (SCR)."
    }
  },
  {
    judgment_id: 503,
    case_name: "Prakash & Ors. v. Phulavati & Ors.",
    court: "Supreme Court of India",
    bench: "Anil R. Dave, Adarsh Kumar Goel, JJ.",
    date: "2015-10-16",
    citation: "(2016) 2 SCC 36 | 2015 INSC 792",
    outcome: "Dismissed (Held prospective; later overruled by Vineeta Sharma)",
    court_reasoning: "Held that the text of Section 6 applies only if both the coparcener father and the daughter were alive on the date of amendment (09.09.2005). Note: This interpretation was subsequently overruled by the 3-Judge Bench in Vineeta Sharma (2020).",
    important_findings: [
      "Earlier held that father must be alive on 09.09.2005 (Now Overruled).",
      "Crucial precedent for understanding the evolution of the living-father doctrine."
    ],
    sections_applied: ["Section 6, Hindu Succession Act 1956"],
    source: {
      source_id: 3,
      source_name: "e-Courts Digital Judicial Library",
      source_url: "https://ecourts.gov.in/judgments/sci/phulavati-2015",
      source_type: "Government Portal",
      verification_status: "Verified",
      verified_by: "Adv. S. Ramanujam",
      verified_date: "2024-01-20",
      notes: "Marked as overruled precedent for historical doctrinal comparison."
    }
  },
  {
    judgment_id: 504,
    case_name: "Associate Builders v. Delhi Development Authority",
    court: "Supreme Court of India",
    bench: "R.F. Nariman, J.",
    date: "2014-11-25",
    citation: "(2015) 3 SCC 49 | 2014 INSC 848",
    outcome: "Allowed (Award Set Aside for Patent Illegality)",
    court_reasoning: "An arbitral award can be set aside under Section 34 if it violates the fundamental policy of Indian law or exhibits patent illegality by disregarding express terms of the contract.",
    important_findings: [
      "Disregarding express contract terms constitutes patent illegality.",
      "Arbitrator is a creature of the contract and cannot travel beyond contractual boundaries."
    ],
    sections_applied: ["Section 34, Arbitration & Conciliation Act 1996", "Section 73, Contract Act"],
    source: {
      source_id: 4,
      source_name: "Supreme Court Case Law Database",
      source_url: "https://main.sci.gov.in/judgment/associate-builders-2014",
      source_type: "Official Government Repository",
      verification_status: "Verified",
      verified_by: "Adv. Priyanka Sen",
      verified_date: "2024-02-14",
      notes: "Benchmark precedent on Section 34 patent illegality standard."
    }
  },
  {
    judgment_id: 505,
    case_name: "Sripati Singh v. State of Jharkhand & Anr.",
    court: "Supreme Court of India",
    bench: "M.R. Shah, A.S. Bopanna, JJ.",
    date: "2021-10-28",
    citation: "2021 SCC OnLine SC 1002 | 2021 INSC 677",
    outcome: "Allowed (Proceedings under Sec 138 Maintained)",
    court_reasoning: "A cheque issued as security, when presented on account of default in repayment of a crystallized loan or commercial invoice, falls within the purview of Section 138 of the NI Act.",
    important_findings: [
      "Security cheques are not immune from Section 138 when default occurs on date of deposit.",
      "Statutory presumption under Section 139 stands in favor of the holder."
    ],
    sections_applied: ["Section 138 & 139, Negotiable Instruments Act 1881"],
    source: {
      source_id: 5,
      source_name: "SCI Neutral Citation Archive",
      source_url: "https://main.sci.gov.in/judgment/sripati-singh-2021",
      source_type: "Official Government Repository",
      verification_status: "Pending Verification",
      verified_by: "Internal Legal Cell (Under Review)",
      verified_date: "2024-03-01",
      notes: "Pending final citation cross-verification with official gazette."
    }
  }
];

export const MOCK_SIMILARITIES = {
  101: [
    {
      judgment_id: 501,
      case_name: "Vineeta Sharma v. Rakesh Sharma & Ors.",
      court: "Supreme Court of India",
      date: "2020-08-11",
      citation: "(2020) 9 SCC 1",
      similarity_score: 95,
      rank_position: 1,
      outcome: "Allowed (In favor of Daughter)",
      why_similar: {
        facts: "Both cases involve ancestral coparcenary property where the father passed away intestate before the 2005 amendment, and brothers asserted an earlier unrecorded oral arrangement.",
        legal_issue: "Identical legal question regarding whether the living status of the father on 09.09.2005 affects the daughter's equal birthright.",
        legal_section: "Exact application of Section 6 of the Hindu Succession Act 1956 and Section 17 of the Registration Act 1908.",
        arguments: "Both appellants argued that coparcenary rights are unobstructed heritage (apratibandha daya) acquired at birth, not by inheritance on the father's death.",
        court_reasoning: "The 3-Judge Bench held that the rights are retroactive and statutory partition requires registration under Section 6(5).",
        outcome_alignment: "Strong precedent directly favoring the appellant's claim for 1/3rd partition share."
      }
    },
    {
      judgment_id: 502,
      case_name: "Danamma @ Suman Surpur & Anr. v. Amar & Ors.",
      court: "Supreme Court of India",
      date: "2018-02-01",
      citation: "(2018) 3 SCC 343",
      similarity_score: 88,
      rank_position: 2,
      outcome: "Allowed (Partition Decreed)",
      why_similar: {
        facts: "Father had died in 2001 leaving two daughters and two sons; pending partition suit granted equal shares to daughters.",
        legal_issue: "Same question regarding applicability of 2005 amendment to pending partition proceedings.",
        legal_section: "Section 6 of Hindu Succession Act.",
        arguments: "Daughters entitled to share as coparceners as long as final partition decree had not been passed prior to 20.12.2004.",
        court_reasoning: "Affirmed daughter's status as coparcener by birth.",
        outcome_alignment: "Supports maintainability of original partition suit."
      }
    },
    {
      judgment_id: 503,
      case_name: "Prakash & Ors. v. Phulavati & Ors. [OVERRULED]",
      court: "Supreme Court of India",
      date: "2015-10-16",
      citation: "(2016) 2 SCC 36",
      similarity_score: 79,
      rank_position: 3,
      outcome: "Dismissed (Hostile Precedent - Now Overruled)",
      why_similar: {
        facts: "Similar coparcenary dispute where respondent argued father must be alive on amendment date.",
        legal_issue: "Prospective vs retroactive application of Section 6.",
        legal_section: "Section 6 of Hindu Succession Act.",
        arguments: "Respondent's defense in current case relies heavily on the Phulavati doctrine.",
        court_reasoning: "Phulavati doctrine held father must be alive, but Vineeta Sharma subsequently explicitly overruled it.",
        outcome_alignment: "Contrasting historical authority useful for rebutting defendant's arguments."
      }
    }
  ],
  102: [
    {
      judgment_id: 504,
      case_name: "Associate Builders v. Delhi Development Authority",
      court: "Supreme Court of India",
      date: "2014-11-25",
      citation: "(2015) 3 SCC 49",
      similarity_score: 91,
      rank_position: 1,
      outcome: "Allowed (Award Set Aside)",
      why_similar: {
        facts: "Arbitral award awarded damages exceeding express terms of contract.",
        legal_issue: "Patent illegality under Section 34 for exceeding contractual mandates.",
        legal_section: "Section 34, Arbitration & Conciliation Act.",
        arguments: "Arbitrator has no jurisdiction to disregard limitation of liability clauses.",
        court_reasoning: "Disregarding contract provisions constitutes patent illegality.",
        outcome_alignment: "Directly supports setting aside the prospective damages award."
      }
    }
  ],
  103: [
    {
      judgment_id: 505,
      case_name: "Sripati Singh v. State of Jharkhand & Anr.",
      court: "Supreme Court of India",
      date: "2021-10-28",
      citation: "2021 SCC OnLine SC 1002",
      similarity_score: 93,
      rank_position: 1,
      outcome: "Allowed (Sec 138 Upheld)",
      why_similar: {
        facts: "Dishonor of cheques claimed to be advance security for commercial transactions.",
        legal_issue: "Maintainability of Sec 138 for security cheques upon crystallized invoice debt.",
        legal_section: "Section 138 & 139, Negotiable Instruments Act.",
        arguments: "Cheque issued as security becomes payable upon commercial default.",
        court_reasoning: "Section 139 presumption applies when liability exists on presentation date.",
        outcome_alignment: "Strong precedent for maintaining criminal complaint."
      }
    }
  ]
};

export const MOCK_PREDICTIONS = {
  101: {
    predicted_outcome: "Suit Likely to be Allowed (Daughter's 1/3rd Equal Share Recognized)",
    confidence_percentage: 84,
    outcome_category: "Favorable to Plaintiff",
    summary: "Based on 3-Judge Supreme Court precedent in Vineeta Sharma (2020), the absence of a registered partition deed prior to 20 December 2004 coupled with statutory coparcenary by birth creates an overwhelming legal foundation for the partition decree.",
    why_this_prediction: [
      "4 authoritative previous judgments analyzed across the Supreme Court and High Courts.",
      "The landmark 3-Judge Bench decision in Vineeta Sharma v. Rakesh Sharma explicitly overruled the 'living father' requirement from Phulavati.",
      "The defendant's oral family arrangement in 2004 lacks compulsory registration under Section 17 of the Registration Act, failing the safe harbor in Section 6(5).",
      "The ancestral nature of the property is undisputed between the parties.",
      "Judicial consensus on Section 6 since 2020 has consistently decreed daughter's equal coparcenary shares."
    ],
    evidence_table: [
      {
        previous_case: "Vineeta Sharma v. Rakesh Sharma",
        court: "Supreme Court (3-Judge Bench)",
        similarity: "95%",
        outcome: "Allowed (Daughter's share upheld)",
        applicability: "Binding Precedent (Directly on point)"
      },
      {
        previous_case: "Danamma v. Amar",
        court: "Supreme Court",
        similarity: "88%",
        outcome: "Allowed (Partition granted)",
        applicability: "Strong Precedent (Pending suit application)"
      },
      {
        previous_case: "Prakash v. Phulavati",
        court: "Supreme Court",
        similarity: "79%",
        outcome: "Dismissed (Overruled in 2020)",
        applicability: "Overruled doctrine (Rebuttal ammo)"
      }
    ],
    risk_factors: [
      "Defense may attempt to prove that alienation or registered partition occurred before Dec 20, 2004.",
      "Valuation and mesne profits determination could lead to extended appellate litigation."
    ]
  },
  102: {
    predicted_outcome: "Arbitral Award Likely to be Partially Set Aside for Patent Illegality",
    confidence_percentage: 78,
    outcome_category: "Favorable to Petitioner",
    summary: "The arbitrator's total omission of the contractual limitation of liability clause violates the bedrock standard established in Associate Builders.",
    why_this_prediction: [
      "5 similar precedents on Section 34(2A) patent illegality reviewed.",
      "Disregard of contract terms is recognized as a jurisdictional error.",
      "Direct violation of fundamental policy under Section 28(3)."
    ],
    evidence_table: [
      {
        previous_case: "Associate Builders v. DDA",
        court: "Supreme Court",
        similarity: "91%",
        outcome: "Award Set Aside",
        applicability: "Directly Binding"
      }
    ],
    risk_factors: [
      "Courts exercise restraint in interfering with arbitral findings of fact."
    ]
  },
  103: {
    predicted_outcome: "Complaint Likely to Proceed with Statutory Presumption Under Section 139",
    confidence_percentage: 82,
    outcome_category: "Favorable to Complainant",
    summary: "Delivery invoices and crystallization of liability trigger the statutory presumption against the defense of 'mere security cheque'.",
    why_this_prediction: [
      "Supreme Court precedent in Sripati Singh directly covers security cheques in commercial supplies.",
      "Burden of proof shifts to the accused to rebut the statutory presumption with preponderance of probabilities."
    ],
    evidence_table: [
      {
        previous_case: "Sripati Singh v. State of Jharkhand",
        court: "Supreme Court",
        similarity: "93%",
        outcome: "Proceedings Maintained",
        applicability: "Direct Precedent"
      }
    ],
    risk_factors: [
      "Accused may dispute delivery receipts or invoke defective goods defense."
    ]
  }
};

export const MOCK_LEGAL_SECTIONS = [
  {
    section_id: 1,
    act_name: "Hindu Succession Act 1956",
    section_number: "Section 6",
    section_title: "Devolution of interest in coparcenary property",
    description: "On and from the commencement of the Hindu Succession (Amendment) Act, 2005, in a Joint Hindu family governed by the Mitakshara law, the daughter of a coparcener shall by birth become a coparcener in her own right.",
    related_cases_count: 8,
    category: "Family Law & Property"
  },
  {
    section_id: 2,
    act_name: "Registration Act 1908",
    section_number: "Section 17",
    section_title: "Documents of which registration is compulsory",
    description: "Instruments of partition and non-testamentary instruments which purport or operate to create, declare, assign, limit or extinguish any right, title or interest in immovable property require mandatory registration.",
    related_cases_count: 12,
    category: "Property & Registration"
  },
  {
    section_id: 3,
    act_name: "Arbitration and Conciliation Act 1996",
    section_number: "Section 34",
    section_title: "Application for setting aside arbitral award",
    description: "Recourse to a Court against an arbitral award may be made only by an application for setting aside such award in accordance with sub-section (2) and sub-section (3).",
    related_cases_count: 15,
    category: "Commercial & Arbitration"
  },
  {
    section_id: 4,
    act_name: "Indian Contract Act 1872",
    section_number: "Section 73",
    section_title: "Compensation for loss or damage caused by breach of contract",
    description: "When a contract has been broken, the party who suffers by such breach is entitled to receive, from the party who has broken the contract, compensation for any loss or damage caused to him thereby.",
    related_cases_count: 24,
    category: "Commercial Contracts"
  },
  {
    section_id: 5,
    act_name: "Negotiable Instruments Act 1881",
    section_number: "Section 138",
    section_title: "Dishonour of cheque for insufficiency, etc., of funds in the account",
    description: "Where any cheque drawn by a person on an account maintained by him with a banker for payment of any amount of money to another person from out of that account is returned unpaid by the bank.",
    related_cases_count: 19,
    category: "Banking & Negotiable Instruments"
  },
  {
    section_id: 6,
    act_name: "Negotiable Instruments Act 1881",
    section_number: "Section 139",
    section_title: "Presumption in favour of holder",
    description: "It shall be presumed, unless the contrary is proved, that the holder of a cheque received the cheque for the discharge, in whole or in part, of any debt or other liability.",
    related_cases_count: 14,
    category: "Banking & Presumptions"
  }
];

export const MOCK_LEGAL_ISSUES = [
  {
    issue_id: 1,
    case_id: 101,
    case_title: "Ananya Sundaram v. Rajeshwar Sundaram",
    question: "Whether amended Section 6 confers coparcenary rights to daughters retroactively even if the father passed away before 2005?",
    act_and_section: "Hindu Succession Act 1956 — Section 6",
    status: "Settled by Vineeta Sharma (2020)",
    leading_precedent: "Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1",
    jurisdiction: "All High Courts & Supreme Court of India"
  },
  {
    issue_id: 2,
    case_id: 101,
    case_title: "Ananya Sundaram v. Rajeshwar Sundaram",
    question: "Whether an unrecorded oral family arrangement can defeat statutory coparcenary claims under Section 6(5)?",
    act_and_section: "Registration Act 1908 — Section 17",
    status: "Requires Registered Partition or Court Decree",
    leading_precedent: "Vineeta Sharma (2020) Paragraph 137",
    jurisdiction: "Supreme Court of India"
  },
  {
    issue_id: 3,
    case_id: 102,
    case_title: "NexTech Logistics v. Vertex Data Solutions",
    question: "Whether arbitrator's disregard of an express contractual limitation of liability clause constitutes patent illegality?",
    act_and_section: "Arbitration Act 1996 — Section 34(2A)",
    status: "Patent Illegality Standard Applied",
    leading_precedent: "Associate Builders v. DDA (2015) 3 SCC 49",
    jurisdiction: "Delhi High Court"
  },
  {
    issue_id: 4,
    case_id: 103,
    case_title: "Prime Steel Corp v. Skyline Infra",
    question: "Whether a security cheque attracts Section 138 prosecution once commercial invoices mature into an enforceable debt?",
    act_and_section: "Negotiable Instruments Act — Section 138 & 139",
    status: "Maintainable upon Default",
    leading_precedent: "Sripati Singh v. State of Jharkhand (2021)",
    jurisdiction: "Bombay High Court"
  }
];

export const MOCK_RECENT_SEARCHES = [
  { query: "Hindu Succession Act Section 6 daughter coparcenary father deceased", date: "2 hours ago", results_count: 14 },
  { query: "Arbitration Section 34 patent illegality consequential damages", date: "Yesterday", results_count: 22 },
  { query: "Section 138 NI Act security cheque crystallized debt default", date: "3 days ago", results_count: 31 },
  { query: "Specific Relief Act Section 20 discretionary relief amendment 2018", date: "Last week", results_count: 18 }
];

export const MOCK_STATS = {
  total_cases: 1284,
  precedents_indexed: 9420,
  verified_sources: "99.4%",
  ai_confidence_avg: "82.5%",
  pending_verifications: 3
};
