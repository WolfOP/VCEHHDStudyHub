import { getInteractiveAnnotationHTML, initInteractiveAnnotationTool } from './InteractiveAnnotationComponent.js'; 
import { getInteractiveMappingHTML, initInteractiveMappingTool } from './InteractiveMappingComponent.js';

const newQuestions = [
    "Using the information provided in the stimulus material and your own knowledge, analyse the key reasons for improvements in Australia's health status since 1900, focusing on the impact of 'old' public health initiatives and the biomedical approach to health and improvements in medical technology.",
    "Drawing on the provided stimuli and your understanding of the social model of health and the Ottawa Charter for Health Promotion, discuss the role of these approaches in promoting health in Australia, with reference to a specific chronic disease.",
    "In relation to a contemporary health issue (e.g., mental health or overweight and obesity), use the information from the sources and your own knowledge to justify why a combination of the biomedical and social models of health is needed to reduce the burden of disease associated with this issue.",
    "Analyse the changes to public health approaches in Australia over time and explain how these different approaches have contributed to improvements in population health outcomes, using examples from the stimulus material and your own knowledge.",
    "Evaluate the effectiveness of one or more health promotion strategies or initiatives discussed in the provided sources in addressing a significant health issue in Australia, making reference to the social model of health or action areas of the Ottawa Charter.",
    "Using data or trends presented in the stimulus material showing changes in health status over time, explain how the contributions of the social model of health and the Ottawa Charter for Health Promotion have likely influenced these observed patterns.",
    "Analyse the challenges in bringing about nutritional change in Australia, linking these challenges to relevant sociocultural and commercial factors. Evaluate how initiatives to promote healthy eating, such as the Australian Dietary Guidelines or the Healthy Eating Pyramid, attempt to address these challenges.",
    "Drawing on the stimulus material and your own knowledge, analyse how two action areas of the Ottawa Charter for Health Promotion are reflected in a health promotion program aimed at improving Aboriginal and Torres Strait Islander Peoples’ health, and evaluate the program's capacity to promote social justice and improve health outcomes.",
    "Analyse the role of Medicare and the National Disability Insurance Scheme (NDIS) in promoting Australia's health, making reference to the concepts of access and equity. Use information from the sources and your own knowledge.",
    "Using provided stimulus material and your own knowledge, discuss the interdependence of different public health approaches (biomedical, social, old public health) in achieving Australia's current health status.",
    "Explain how initiatives similar to those associated with the 'old' public health were used in response to a contemporary health challenge (e.g., a pandemic like COVID-19 or managing infectious diseases) and justify why both the biomedical and social models of health are important in addressing this challenge.",
    "Evaluate the impact of initiatives to promote healthy eating in Australia and their ability to improve health outcomes, using evidence from the stimulus material and drawing conclusions as to why nutritional improvements are difficult to achieve.",
    "Analyse the strengths and limitations of both the biomedical model and the social model of health in bringing about improvements in health status in Australia, using examples and information from the provided sources.",
    "Using information from the sources and your own knowledge, explain how the roles of the Pharmaceutical Benefits Scheme (PBS) and private health insurance contribute to promoting Australia's health, considering factors such as funding and sustainability.",
    "Drawing on data and case studies provided in the stimulus material, analyse how different public health approaches and health promotion efforts reflecting the action areas of the Ottawa Charter have been used to address factors contributing to the burden of disease in Australia."
];

const allStimuliHTML = `
<div class="stimulus-item"><h3>Stimulus 1: Bar Graph - National Health Priority Areas (NHPAs) Burden of Disease (DALYs), Australia, 2020</h3><p>(Source: Hypothetical AIHW-style report)</p><p>This vertical bar graph, titled "<strong>Contribution to Australia\'s Total Disease Burden (DALYs) by Former National Health Priority Areas, 2020</strong>," presents data adapted from the Australian Burden of Disease Study modelling for that year. The Y-axis, labelled "Percentage of Total DALYs (%)" ranges from 0% to 30%, while the X-axis lists major disease and injury groups that were central to Australia\'s former National Health Priority Areas (NHPAs) framework. This framework was historically used to focus public health efforts on conditions imposing a significant burden on the population. The graph uses the <strong>Disability-Adjusted Life Year (DALY)</strong> metric, a comprehensive measure of population health that quantifies the gap between current health status and an ideal situation where everyone lives into old age free of disease and disability. One DALY represents one lost year of \'healthy\' life, combining years of life lost due to premature mortality (YLL) with years lived with disability (YLD).</p><ul><li><strong>Cardiovascular Disease:</strong> 24% of total DALYs.</li><li><strong>All Cancers (combined):</strong> 19%.</li><li><strong>Mental & Substance Use Disorders:</strong> 13%.</li><li><strong>Musculoskeletal Conditions</strong> (e.g., arthritis, back pain): 10%.</li><li><strong>Diabetes Mellitus</strong> (Type 1 & 2 combined): 6%.</li><li><strong>Asthma:</strong> 5%.</li><li><strong>Injury</strong> (encompassing transport accidents, falls, and intentional self-harm): 5%.</li></ul><p>The data visually underscores that chronic, non-communicable diseases and mental health conditions constituted the majority of disease burden in Australia in 2020, highlighting areas of continued importance for health system planning, resource allocation for prevention and treatment, and targeted public health interventions.</p></div>
<div class="stimulus-item"><h3>Stimulus 2: Table - Selected Health Indicators by Socioeconomic Status (SES) Quintile, Australia, 2022</h3><p>(Source: Australian Institute of Health and Welfare - AIHW)</p><p>This table, titled "Comparison of Key Health Indicators across Socioeconomic Status Quintiles, Persons aged 15-64 years, Australia, 2022," is sourced from the Australian Institute of Health and Welfare (AIHW), Australia’s national agency for health and welfare statistics. It presents a comparison of health outcomes across the Australian population divided into five equal groups, or quintiles, based on their Socioeconomic Status (SES). SES is a composite measure reflecting an individual\'s or group\'s social and economic position, typically determined by income, education level, and occupation, and is recognised as a powerful determinant of health. The clear disparities shown across the quintiles illustrate the social gradient of health, a phenomenon where health outcomes generally improve as socioeconomic position increases.</p><table><thead><tr><th>Health Indicator</th><th>Quintile 1 (Lowest SES)</th><th>Quintile 2</th><th>Quintile 3</th><th>Quintile 4</th><th>Quintile 5 (Highest SES)</th></tr></thead><tbody><tr><td>Life Expectancy at Birth (Years, Avg)</td><td>79.0</td><td>80.5</td><td>81.8</td><td>83.5</td><td>85.0</td></tr><tr><td>Current Daily Smokers (%)</td><td>22.5%</td><td>18.0%</td><td>12.5%</td><td>9.0%</td><td>7.5%</td></tr><tr><td>Avoidable Hospitalisations (per 1000 people)</td><td>58.0</td><td>45.5</td><td>38.0</td><td>32.5</td><td>30.0</td></tr></tbody></table><p>The data reveals a 6-year gap in average life expectancy at birth between the lowest and highest SES quintiles. Rates of current daily smoking, a major modifiable risk factor for numerous diseases, are three times higher in the lowest SES quintile compared to the highest. Furthermore, avoidable hospitalisations – admissions for conditions potentially preventable through timely and adequate non-hospital care (such as effective primary care or management of chronic conditions) – are almost double in the lowest SES quintile. These differences point to significant health inequities driven by variations in living and working conditions, access to resources, exposure to risk factors, and health literacy.</p></div>
<div class="stimulus-item"><h3>Stimulus 3: Pie Chart - Distribution of Total Health Expenditure by Sector, Australia, 2021–22</h3><p>(Source: AIHW Health Expenditure Australia report)</p><p>This pie chart, titled "<strong>Where Australia\'s Health Dollar Was Spent, Total Health Expenditure by Sector, 2021-22</strong>," illustrates the allocation of Australia\'s national health spending across various areas of the health system, based on data from the Australian Institute of Health and Welfare (AIHW). Total health expenditure encompasses spending from all sources, including government, individuals, and private health insurers. The distribution reflects the nation\'s health system priorities and the balance between reactive treatment and proactive prevention.</p><ul><li><strong>Hospitals (Public & Private Combined):</strong> 39.0%. This largest share reflects the costs associated with acute care, emergency services, complex surgeries, and inpatient treatments, often aligned with the biomedical model\'s focus on treating established diseases.</li><li><strong>Primary Healthcare:</strong> 23.0%. This includes services representing the first point of contact with the health system, such as General Practitioners (GPs), allied health professionals (e.g., physiotherapists, psychologists, dietitians), dental services, and community health centres. Strong primary care is crucial for prevention, early detection, and management of ongoing health conditions.</li><li><strong>Medications (Pharmaceuticals):</strong> 10.0%. This covers the cost of prescription and over-the-counter medicines, significantly influenced by the Pharmaceutical Benefits Scheme (PBS) which subsidises many essential drugs.</li><li><strong>Capital Expenditure (e.g., buildings, medical equipment):</strong> 7.0%.</li><li><strong>Health Administration & Insurance (government & private):</strong> 6.7%.</li><li><strong>Medical Research (e.g., NHMRC funding, university research):</strong> 2.0%.</li><li><strong>Public Health Initiatives (Population-level Prevention, Promotion, Protection):</strong> 2.3%. This relatively small segment funds programs like national immunisation schedules, cancer screening programs, health education campaigns (e.g., anti-smoking, healthy lifestyle promotion), and communicable disease control. The proportion allocated to public health often sparks discussion about the health system\'s capacity to proactively address the determinants of health and prevent illness, aligning with principles of the social model of health.</li><li><strong>Other Recurrent Health Spending (e.g., patient transport, community mental health):</strong> 10.0% (to total 100%).</li></ul></div>
<div class="stimulus-item"><h3>Stimulus 4: Infographic - Closing the Gap – Selected Target Progress, 2023 Snapshot</h3><p>(Source: Adapted from official National Agreement on Closing the Gap data and reports)</p><p>This infographic, titled "<strong>Closing the Gap: Progress on Key Socio-Economic Targets for Aboriginal and Torres Strait Islander Peoples – 2023 Update</strong>," provides a visual summary of national progress towards achieving equality in life outcomes. The <strong>National Agreement on Closing the Gap</strong> is a formal commitment between all Australian governments and the Coalition of Aboriginal and Torres Strait Islander Peak Organisations, focusing on overcoming the entrenched inequality faced by Indigenous Australians through specific, measurable targets and a strengths-based, community-led approach. The infographic highlights that while some improvements are being made, significant disparities persist, reflecting the ongoing impacts of colonisation, systemic discrimination, and intergenerational trauma, and underscoring the importance of Indigenous self-determination and culturally safe services.</p><div><h4>Overall Headline:</h4><p>A prominent statement: "<strong>The Life Expectancy Gap between Aboriginal and Torres Strait Islander peoples and non-Indigenous Australians remains significant at approximately 8.2 years for males and 7.8 years for females.</strong>"</p></div><div><h4>Section 1: Education - Target: Increase Year 12 Attainment</h4><p>Icon: Graduation cap.</p><p>Text & Data: "In 2021, <strong>71.5%</strong> of Aboriginal and Torres Strait Islander people aged 20-24 years had attained a Year 12 or equivalent qualification. This is an increase from <strong>63.2%</strong> in 2016."</p><p>Visual: A progress bar showing upward movement, with text "Showing improvement, but parity not yet reached."</p><p>Context: Education is a key determinant of health and other life outcomes.</p></div><div><h4>Section 2: Children - Target: Healthy Birthweight</h4><p>Icon: Stylised healthy baby.</p><p>Text & Data: "<strong>89.7%</strong> of Aboriginal and Torres Strait Islander babies were born with a healthy birthweight in 2021. The target is to reach 91% by 2031."</p><p>Visual: A circular dial almost reaching the target, with text "Progressing, ongoing focus on maternal and child health crucial."</p><p>Context: Healthy birthweight is a critical indicator of early life health and future wellbeing.</p></div><div><h4>Section 3: Employment - Target: Increase Proportion in Employment</h4><p>Icon: Briefcase or people working.</p><p>Text & Data: "The employment rate for Aboriginal and Torres Strait Islander people aged 25-64 years was <strong>51.8%</strong> in 2021, compared to <strong>75.9%</strong> for non-Indigenous Australians in the same age group."</p><p>Visual: Two distinct bars clearly showing the employment gap, with text "Substantial gap highlights need for greater economic opportunity and addressing employment barriers."</p><p>Context: Employment impacts income, housing, social inclusion, and health.</p></div><div><h4>Section 4: Justice - Target: Reduce Adult Incarceration Rates</h4><p>Icon: Scales of justice, slightly unbalanced.</p><p>Text & Data: "Aboriginal and Torres Strait Islander adults were imprisoned at a rate of <strong>2,222 per 100,000 adults</strong> in 2022, over 12 times the rate for non-Indigenous adults. This target is not on track."</p><p>Visual: A stark bar chart emphasizing the extreme overrepresentation.</p><p>Context: High incarceration rates have devastating impacts on individuals, families, communities, and health. Addressing the underlying causes is critical.</p></div></div>
<div class="stimulus-item"><h3>Stimulus 5: Quote – NACCHO CEO Pat Turner on Culturally Safe Healthcare</h3><p>This is a direct quote from <strong>Pat Turner AM, CEO of the National Aboriginal Community Controlled Health Organisation (NACCHO)</strong>, the national peak body representing Aboriginal Community Controlled Health Services (ACCHSs) across Australia. ACCHSs are primary healthcare services initiated and operated by local Aboriginal communities to deliver holistic, comprehensive, and culturally appropriate healthcare. The quote was part of a speech delivered at the NACCHO Members’ Conference in 2022, emphasizing a foundational requirement for improving Indigenous health outcomes.</p><blockquote><p>"Our people have the right to health, a right that can only be realised through fundamental reform of mainstream health services and continued investment in our Aboriginal Community Controlled Health Services. <strong>Investing in culturally safe healthcare is the cornerstone of improving Aboriginal health outcomes. Without it, services won’t be trusted or accessed.</strong> Cultural safety is not a tick-box exercise; it is about creating environments – physical, social, and spiritual – where our people feel safe, respected, and where their unique cultural needs, values, and identities are understood and affirmatively met. It requires ongoing critical self-reflection by non-Indigenous health professionals and systemic change within organisations to dismantle racism and ensure power is shared."</p></blockquote></div>
<div class="stimulus-item"><h3>Stimulus 6: Line Graph - Daily Smoking Rates in Australia, Adults 18+ years, 1980–2022</h3><p>(Source: AIHW National Drug Strategy Household Survey data series)</p><p>This line graph, titled "<strong>Trends in Daily Smoking Prevalence, Australian Adults (18+ years), 1980-2022</strong>," is derived from data collected through the long-running AIHW National Drug Strategy Household Survey. It tracks the percentage of Australian adults who reported smoking tobacco on a daily basis over a 42-year period, illustrating a significant public health achievement in reducing smoking, a leading preventable cause of chronic disease and premature death. Key policy interventions are marked on the timeline to indicate their potential influence on the observed trend.</p><ul><li>The Y-axis shows "Percentage of Adults Smoking Daily (%)" from 0% to 40%. The X-axis shows "Year" from 1980 to 2022.</li><li>The line starts at <strong>35% in 1980</strong>, showing a gradual decline through the 1980s.</li><li>A steeper decline is noted from the early 1990s, with a point marked "<strong>1990s-2000s: Significant Tobacco Tax Increases & Ad Bans</strong>." By 2000, the rate is approximately <strong>22%</strong>.</li><li>The decline continues, with another marked point: "<strong>2012: Plain Packaging Legislation Introduced</strong>."</li><li>The line reaches <strong>11% in 2022</strong>.</li></ul><p>The graph demonstrates the impact of comprehensive, multi-faceted public health strategies, including legislation (e.g., advertising bans, smoke-free environments, plain packaging), taxation, and public education campaigns, reflecting several action areas of the Ottawa Charter for Health Promotion, particularly \'Build Healthy Public Policy\' and \'Create Supportive Environments.\'</p></div>
<div class="stimulus-item"><h3>Stimulus 7: Table - Comparison of Biomedical and Social Models of Health Approaches</h3><p>This table, titled "Biomedical vs. Social Models of Health: Key Features and Approaches to Health Issues," provides a side-by-side comparison of two dominant conceptual frameworks used to understand health and illness, and to guide healthcare and health promotion efforts.</p><table><thead><tr><th>Feature</th><th>Biomedical Model of Health</th><th>Social Model of Health</th></tr></thead><tbody><tr><td>Primary Focus</td><td>Disease, illness, disability; diagnosis, treatment, cure.</td><td>Broader determinants of health (social, economic, environmental, cultural); prevention of illness; health promotion; equity.</td></tr><tr><td>Concept of Health</td><td>Absence of disease or physical affliction.</td><td>A state of complete physical, mental, and social wellbeing, not merely the absence of disease or infirmity (WHO definition); a resource for everyday life.</td></tr><tr><td>Key Strategies/Interventions</td><td>Medical interventions (surgery, medication), technology, specialist services, individual patient care.</td><td>Addressing social inequities, community empowerment, health education, policy development (e.g., housing, employment, education), creating supportive environments, inter-sectoral collaboration.</td></tr><tr><td>Role of Individual</td><td>Passive recipient of treatment.</td><td>Active participant in their health; empowered to make choices and take control.</td></tr><tr><td>Responsibility for Health</td><td>Primarily with the medical profession and individual lifestyle choices (when illness occurs).</td><td>Shared responsibility between individuals, communities, and government/society (addressing underlying determinants).</td></tr><tr><td>Example Approach to Obesity</td><td>Focus on individual diagnosis (BMI, comorbidities), medical management (diet plans, weight-loss drugs, bariatric surgery).</td><td>Focus on factors contributing to obesity (food security, access to affordable healthy food, marketing of unhealthy foods, built environments that discourage activity, socioeconomic factors), community programs, food policy.</td></tr><tr><td>Limitations</td><td>Neglects broader determinants, can be costly, focuses on \'downstream\' solutions, may not promote equity.</td><td>Can be complex and slow to achieve change, may not address immediate medical needs of an individual.</td></tr></tbody></table><p>The biomedical model has been dominant in Western medicine, achieving significant advances in treating diseases. The social model emerged from a recognition that many health problems are rooted in societal factors and that improvements in population health require addressing these broader determinants and promoting equity. Modern public health often seeks to integrate the strengths of both models.</p></div>
<div class="stimulus-item"><h3>Stimulus 8: Map - Per Capita Access to Medicare-Funded Mental Health Services by Remoteness Area, Australia, 2022</h3><p>(Source: Hypothetical Department of Health and Aged Care data analysis)</p><p>This is a thematic map of Australia, titled "<strong>Geographical Disparities in Access to Medicare-Funded Specialist Mental Health Services (per 1000 population), 2022</strong>." The map uses a colour gradient (heat map style) to represent the rate of service utilisation (e.g., psychiatrist or psychologist consultations claimed through Medicare) per 1,000 people across different Australian Statistical Geography Standard (ASGS) Remoteness Areas. <strong>Medicare</strong> is Australia\'s universal health insurance scheme, providing subsidised access to a range of medical services, including certain mental health services via Mental Health Treatment Plans.</p><ul><li><strong>Major Cities:</strong> Displayed in dark blue, indicating the highest rate of service access (e.g., >150 services per 1000 population).</li><li><strong>Inner Regional Areas:</strong> Displayed in mid-blue (e.g., 100-149 services per 1000 population).</li><li><strong>Outer Regional Areas:</strong> Displayed in light blue/teal (e.g., 60-99 services per 1000 population).</li><li><strong>Remote Areas:</strong> Displayed in pale yellow (e.g., 30-59 services per 1000 population).</li><li><strong>Very Remote Areas:</strong> Displayed in orange/light red, indicating the lowest rate of service access (e.g., <30 services per 1000 population).</li></ul><p>A legend clearly defines the colour categories and corresponding service access rates. The map visually demonstrates significant regional disparities in access to formal mental health care. Factors contributing to lower access in rural and remote areas include workforce shortages (fewer mental health professionals), greater travel distances and costs for patients, limited availability of diverse service types, variable internet connectivity impacting telehealth options, and potentially higher levels of stigma or different help-seeking behaviours. These access barriers can exacerbate mental health issues and contribute to poorer health outcomes in these communities.</p></div>
<div class="stimulus-item"><h3>Stimulus 9: Infographic - Australia’s Health Performance Framework (AHPF) - Core Domains</h3><p>(Source: Adapted from AIHW AHPF descriptions)</p><p>This infographic, titled "<strong>Understanding Australia’s Health: Key Domains of the National Health Performance Framework</strong>," visually outlines the structure used by the Australian Institute of Health and Welfare (AIHW) and other health authorities to systematically measure, monitor, and report on the health of Australians and the functioning of the nation\'s health system. The AHPF provides a comprehensive approach to understanding health outcomes and the factors and systems that influence them.</p><div><h4>Central Title: Australia’s Health Performance Framework</h4></div><div><h4>Domain 1: HEALTH STATUS</h4><p>Icon: Stylised heart/ECG line or healthy person.</p><p>Text: "Focuses on the health of the population and specific groups."</p><h5>Sub-points/Examples:</h5><ul><li>Life expectancy & wellbeing</li><li>Incidence & prevalence of diseases (e.g., cancer, diabetes, mental health conditions)</li><li>Mortality rates & causes of death</li><li>Burden of disease (DALYs)</li><li>Functioning & disability</li></ul></div><div><h4>Domain 2: DETERMINANTS OF HEALTH</h4><p>Icon: Interconnected web or people in different environments.</p><p>Text: "Examines the wide range of factors that influence health outcomes, acting as risk or protective factors."</p><h5>Sub-points/Categories (with examples):</h5><ul><li><em>Environmental Factors:</em> Air quality, water quality, housing, access to services.</li><li><em>Socioeconomic Factors:</em> Education, employment, income, social support, early life experiences.</li><li><em>Health Behaviours:</em> Tobacco smoking, alcohol consumption, diet, physical activity, use of illicit drugs.</li><li><em>Biomedical Factors:</em> Body weight, blood pressure, cholesterol levels, genetic predispositions.</li></ul></div><div><h4>Domain 3: HEALTH SYSTEM PERFORMANCE</h4><p>Icon: Stethoscope and a tick mark, or gears working together.</p><p>Text: "Assesses how well the health system is operating to improve and maintain health."</p><h5>Key Dimensions (with brief descriptors):</h5><ul><li><em>Effectiveness:</em> Care producing desired outcomes based on evidence.</li><li><em>Safety:</em> Avoiding harm from healthcare.</li><li><em>Accessibility:</em> People obtaining healthcare when and where needed (considering affordability, location, timeliness, cultural appropriateness).</li><li><em>Efficiency:</em> Achieving results with minimal waste of resources.</li><li><em>Equity:</em> Fairness in access and outcomes for all groups.</li><li><em>Sustainability:</em> Capacity to meet current and future health needs.</li></ul></div><p>Arrows or connecting lines show that Determinants influence Health Status, and Health System Performance aims to improve Health Status and can also influence Determinants.</p></div>
<div class="stimulus-item"><h3>Stimulus 10: Case Study - Jack – An 18-year-old from Outer Suburban Melbourne</h3><p>Jack is an 18-year-old living in an outer suburban area of Melbourne, characterised by limited public transport options and fewer local job opportunities compared to inner-city areas. This area is classified as having a lower-to-middle Socioeconomic Status (SES) profile on average. Jack left mainstream school at 16 after completing Year 10, finding it difficult to engage with the curriculum and feeling unsupported. He currently works casual shifts at a fast-food restaurant, with irregular hours and no sick pay.</p><p>Jack reports often feeling "stressed out" and anxious, particularly about his future and finances, but has never spoken to a doctor about these feelings. He started smoking cigarettes at age 15 and currently smokes about 10-15 per day, finding it helps him "cope." His diet largely consists of convenience foods; he frequently skips breakfast due to morning shifts or feeling rushed, and often eats take-away for dinner. He doesn’t have a regular General Practitioner (GP) and last saw a doctor over a year ago for a minor injury. Jack says he rarely engages in planned physical activity, stating that gym memberships are too expensive and he "doesn\'t have the time or energy" after work. He spends most of his leisure time online or with a small group of friends. His circumstances illustrate the complex interplay of social determinants of health (education, employment, income, geographic location), behavioural determinants (smoking, diet, physical inactivity), and biological determinants (age, stress/anxiety) impacting a young person\'s health and wellbeing, as well as highlighting potential barriers to accessing healthcare and adopting protective health behaviours.</p></div>
<div class="stimulus-item"><h3>Stimulus 11: Media Release - Launch of the National Preventive Health Strategy 2021–2030</h3><p>(Source: Hypothetical Government Department of Health Statement)</p><h5>FOR IMMEDIATE RELEASE</h5><p>Canberra, ACT – [Date, 2021] – Minister for Health Announces Landmark National Preventive Health Strategy</p><p>Today, the Hon. [Minister\'s Name], Minister for Health, unveiled the National Preventive Health Strategy 2021–2030, a groundbreaking 10-year plan designed to build a healthier Australia by prioritising the prevention of illness and injury, and fostering environments that support wellness for all citizens. This Strategy represents a paradigm shift, embedding prevention as a core pillar of the Australian health system.</p><p>"This Strategy is a commitment to a future where Australians live longer, healthier, and more productive lives," stated Minister [Minister\'s Name]. "For too long, our health system has predominantly focused on treating illness after it occurs. While this remains crucial, we must also significantly bolster our efforts to prevent ill health from developing in the first place. This is not only better for individuals and families but also essential for the long-term sustainability of our health system."</p><p>The Strategy outlines ambitious key targets to be achieved by 2030, including:</p><ul><li>Reducing daily smoking rates to <strong>under 5%</strong> of the adult population.</li><li>Increasing the proportion of adults engaging in sufficient physical activity by <strong>15%</strong>.</li><li>Halting the rise in overweight and obesity rates in adults, and reducing childhood overweight and obesity by <strong>5%</strong>.</li><li>Improving national health literacy levels, ensuring more Australians can access, understand, and apply health information to make informed decisions.</li></ul><p>A central tenet of the Strategy is equity, with a strong focus on reducing health disparities experienced by Aboriginal and Torres Strait Islander peoples, people from culturally and linguistically diverse backgrounds, those living in rural and remote areas, and socioeconomically disadvantaged communities. It emphasises the need to address the underlying social, economic, and environmental determinants of health.</p><p>Key pillars of action include:</p><ol><li>Creating healthier and more supportive physical and social environments.</li><li>Empowering individuals and communities to make healthier choices.</li><li>Strengthening preventive health services within primary care.</li><li>Investing in preventive health research and data.</li></ol><p>The Minister added, "Implementing this Strategy will require a collaborative effort involving all levels of government, non-government organisations, industry, communities, and individuals. It\'s an investment in our nation\'s greatest asset – the health of our people."</p></div>
<div class="stimulus-item"><h3>Stimulus 12: Quote – World Health Organization (WHO) on Health and Sustainable Development Goal 3 (SDG 3)</h3><p>This statement is from a 2019 World Health Organization (WHO) policy brief titled "<strong>Health: A Prerequisite and Driver for Sustainable Development</strong>," discussing the centrality of health to the United Nations\' 2030 Agenda for Sustainable Development. The <strong>Sustainable Development Goals (SDGs)</strong> are a collection of 17 interlinked global goals designed to be a "blueprint to achieve a better and more sustainable future for all." <strong>SDG 3: Good Health and Well-being</strong> aims to "Ensure healthy lives and promote well-being for all at all ages."</p><blockquote><p>"The 2030 Agenda for Sustainable Development is an ambitious global commitment to peace and prosperity for people and the planet, now and into the future. Within this agenda, <strong>health is not only an outcome of sustainable development; it is also a fundamental driver and enabler.</strong> Good health is intrinsically valuable, but it also empowers individuals to learn, earn, and contribute to their communities. Healthy populations are more resilient, more productive, and better able to contribute to economic growth, social cohesion, and environmental sustainability. <strong>Without a clear and sustained focus on achieving good health and well-being for all (SDG 3), progress towards the other Sustainable Development Goals – be they related to poverty reduction (SDG 1), quality education (SDG 4), gender equality (SDG 5), decent work (SDG 8), or climate action (SDG 13) – will be significantly undermined.</strong> Investing in health systems that provide universal health coverage is therefore an investment in human capital and a cornerstone of sustainable development."</p></blockquote></div>
<div class="stimulus-item"><h3>Stimulus 13: Photo with Caption - Aboriginal Health Worker Providing Care in a Community Clinic</h3><p>(Source: Hypothetical Community Health Service Newsletter)</p><div><p><strong>[Visual Description: A warmly lit, culturally welcoming clinic room. An Aboriginal Health Worker (AHW), identifiable by a name badge and professional attire, is attentively taking a seated older Aboriginal male patient’s blood pressure. The AHW is making eye contact with the patient and appears to be listening actively. Artwork by local Indigenous artists is visible on the clinic wall. The patient appears comfortable and engaged in conversation.]</strong></p></div><div><p><strong>Caption:</strong> "Empowering Our Community Through Culturally Safe Care: Aunty Joan, one of our dedicated Aboriginal Health Workers at the [Name of Community] Aboriginal Community Controlled Health Service, provides a vital health check for Uncle Charlie. Our AHWs are trusted members of the community who provide a wide range of clinical services, health education, and advocacy. By ensuring healthcare is delivered in a culturally safe and respectful environment, where traditional values are understood and integrated, we see improved local trust in services, increased engagement in preventative health, and better continuity of care, particularly for managing chronic conditions. This approach is fundamental to addressing health disparities and fostering self-determination in health for our people."</p></div><p>The image and caption highlight the critical role of Aboriginal Community Controlled Health Services (ACCHSs) and their Indigenous workforce in providing accessible, appropriate, and effective primary healthcare. They emphasize how cultural safety is not just an add-on but a core component of quality care that directly impacts health engagement and outcomes for Aboriginal and Torres Strait Islander peoples.</p></div>
<div class="stimulus-item"><h3>Stimulus 14: Table - Core Principles of the Australian Dietary Guidelines (ADGs) 1–3</h3><p>(Source: NHMRC - Eatforhealth.gov.au)</p><p>This table provides a summary of the foundational advice from the first three of the five Australian Dietary Guidelines (ADGs). These guidelines are developed by the National Health and Medical Research Council (NHMRC) based on the latest scientific evidence. They provide recommendations on the types and amounts of foods, food groups, and dietary patterns that aim to promote health and wellbeing, reduce the risk of diet-related conditions (such as high cholesterol, high blood pressure, and obesity), and reduce the risk of chronic diseases (such as type 2 diabetes, cardiovascular disease, and some types of cancers).</p><table><thead><tr><th>Guideline Number</th><th>Guideline Statement</th><th>Brief Explanation of Core Principle</th></tr></thead><tbody><tr><td>Guideline 1</td><td>To achieve and maintain a healthy weight, be physically active and choose amounts of nutritious food and drinks to meet your energy needs.</td><td>Emphasises energy balance. Children and adolescents should eat sufficient nutritious foods for growth and development. Older people should eat nutritious foods and keep physically active to maintain muscle strength and a healthy weight.</td></tr><tr><td>Guideline 2</td><td>Enjoy a wide variety of nutritious foods from these five groups every day:<ul><li>Plenty of vegetables, including different types and colours, and legumes/beans</li><li>Fruit</li><li>Grain (cereal) foods, mostly wholegrain and/or high cereal fibre varieties</li><li>Lean meats and poultry, fish, eggs, tofu, nuts and seeds, and legumes/beans</li><li>Milk, yoghurt, cheese and/or their alternatives, mostly reduced fat.</li></ul>And drink plenty of water.</td><td>Focuses on nutrient adequacy and variety. Eating a diverse range of foods from all five core food groups provides the essential vitamins, minerals, fibre, and other phytonutrients needed for optimal health and bodily function. Water is the best drink.</td></tr><tr><td>Guideline 3</td><td>Limit intake of foods containing saturated fat, added salt, added sugars and alcohol.</td><td>Advises limiting discretionary choices. These are energy-dense foods and drinks often high in kilojoules, saturated fat, added sugars, and/or salt (e.g., sugary drinks, confectionery, processed meats, many takeaway foods) or alcohol, which can increase the risk of obesity and chronic disease if consumed in excess. These should only be consumed sometimes and in small amounts.</td></tr></tbody></table></div>
<div class="stimulus-item"><h3>Stimulus 15: Statistic with Context - Low Vegetable Intake in Australia</h3><p>(Source: Cancer Council National Health Survey Analysis, 2023 - Hypothetical but based on real trends)</p><p>A report released by the Cancer Council Australia in early 2023, analysing data from the most recent National Health Survey, revealed persistently low levels of vegetable consumption across the Australian population, highlighting a significant public health concern. Vegetables are a cornerstone of a healthy diet, providing essential vitamins, minerals, dietary fibre, and antioxidants, which play a crucial role in preventing chronic diseases, including several types of cancer, cardiovascular disease, and type 2 diabetes. The Australian Dietary Guidelines recommend adults consume at least 5 serves of vegetables per day.</p><p>The Cancer Council\'s analysis found:</p><ul><li>"Only <strong>5% of Australian adults</strong> (aged 18 and over) and less than <strong>1% of adolescents</strong> (aged 12-17 years) met the recommended daily intake of vegetables in 2022-23."</li><li>"Contributing factors identified through associated research include the perceived higher cost of fresh produce compared to energy-dense processed foods, issues of convenience and time constraints for meal preparation, a lack of culinary skills and knowledge about how to prepare vegetables appealingly, and the pervasive marketing and availability of unhealthy food options."</li></ul><p>The report called for urgent, multi-level interventions, including policies to improve food affordability and access, stronger regulation of unhealthy food marketing, and enhanced public education campaigns to address this widespread dietary shortfall.</p></div>
<div class="stimulus-item"><h3>Stimulus 16: Campaign Scenario - "Fuel for Life" – A National Youth Vegetable Intake Initiative</h3><p>(Hypothetical Government & NGO Partnership)</p><h4>Campaign Overview:</h4><p>"Fuel for Life" was a 12-month national public health campaign launched in 2022, co-funded by the Federal Department of Health and a consortium of leading health NGOs (e.g., Nutrition Australia, Cancer Council). Its primary objective was to increase vegetable consumption among Australian teenagers (13-18 years), a group identified with critically low intake levels.</p><h4>Campaign Strategies & Elements:</h4><ul><li><strong>Social Media & Influencer Engagement:</strong> Utilised popular platforms like TikTok, Instagram, and YouTube. Partnered with relatable youth influencers (gamers, athletes, young chefs) to create engaging content (e.g., "quick veggie snack hacks," "veggie-boosted meal challenges," myth-busting about vegetables). Hashtag: #FuelForLifeChallenge.</li><li><strong>Interactive Website & App:</strong> Featured simple, teen-friendly recipes, a "vegetable of the month" spotlight, gamified challenges (e.g., "eat the rainbow" tracker), and short educational videos on the benefits of vegetables for energy, skin health, and sports performance.</li><li><strong>School-Based Interventions:</strong> Provided participating secondary schools with "Fuel for Life School Meal Kits" containing resources for canteens to offer more appealing vegetable-rich options, curriculum-linked educational materials for health classes, and funding for student-led veggie garden projects.</li><li><strong>Partnerships with Supermarkets:</strong> Limited-time in-store promotions on selected vegetables, recipe cards available in produce sections.</li></ul><h4>Evaluation Findings (End-of-Campaign Report Summary):</h4><ul><li><strong>Awareness & Reach:</strong> Post-campaign surveys indicated high prompted awareness of the "Fuel for Life" brand among 75% of the target demographic. Social media content achieved over 10 million impressions.</li><li><strong>Attitudinal Shift:</strong> A statistically significant positive shift in reported attitudes towards vegetables was observed, with more teens agreeing that "vegetables are important for health" and "can taste good."</li><li><strong>Knowledge:</strong> Self-reported knowledge of the recommended daily serves of vegetables increased by 20%.</li><li><strong>Behavioural Change (Self-Reported):</strong> 30% of teens exposed to the campaign reported trying at least one new vegetable during the campaign period. 15% reported a slight increase in their overall weekly vegetable intake.</li><li><strong>Behavioural Change (Objective Data - Limited):</strong> Analysis of national supermarket scan data showed a minor (2%) temporary uplift in sales of fresh and frozen vegetables during peak campaign periods, but this was not sustained post-campaign. Data from participating school canteens was inconclusive due to inconsistent reporting.</li><li><strong>Conclusion:</strong> The campaign was highly successful in raising awareness and improving attitudes/knowledge. However, achieving significant, measurable, and <strong>sustained long-term behavioural change</strong> in vegetable consumption among teenagers proved challenging with the current strategies alone. The report recommended future initiatives incorporate stronger policy levers (e.g., canteen guidelines, affordability measures) and longer-term, community-embedded approaches.</li></ul></div>
<div class="stimulus-item"><h3>Stimulus 17: Grouped Bar Graph - Physical Activity Levels by Age Group & Gender, Australia, 2021-22</h3><p>(Source: Hypothetical National Physical Activity Survey)</p><p>This grouped bar graph, titled "<strong>Meeting Australian Physical Activity Guidelines: Percentage of Population by Age Group and Gender, 2021-22</strong>," displays data on the proportion of Australians who self-reported meeting the national guidelines for sufficient physical activity for their age. The Australian Physical Activity Guidelines generally recommend at least 60 minutes of moderate to vigorous physical activity per day for children and adolescents (5-17 years), and 150-300 minutes of moderate-intensity (or 75-150 minutes of vigorous-intensity) physical activity per week for adults (18-64 years).</p><ul><li>The Y-axis shows "Percentage Meeting Guidelines (%)" from 0% to 100%.</li><li>The X-axis has three age groups: "Children (5–11 years)," "Adolescents (12–17 years)," and "Young Adults (18–24 years)."</li><li>Within each age group, there are two bars side-by-side: one for "Males" and one for "Females" (clearly legend-keyed).</li></ul><p><strong>Data Represented by Bars:</strong></p><ul><li><strong>Children (5–11 years):</strong><ul><li>Males: 80%</li><li>Females: 75%</li></ul></li><li><strong>Adolescents (12–17 years):</strong> (Shows a sharp drop from childhood)<ul><li>Males: 55%</li><li>Females: 45% (Notably lower than males in this age group)</li></ul></li><li><strong>Young Adults (18–24 years):</strong> (Shows further decline for both, but gender gap persists)<ul><li>Males: 48%</li><li>Females: 40%</li></ul></li></ul><p>The graph illustrates a significant decline in physical activity levels from childhood through adolescence into young adulthood. It also highlights a persistent gender disparity, with females consistently reporting lower rates of meeting activity guidelines than males across these age groups, particularly during adolescence. Factors contributing to these trends can include changing life priorities (e.g., increased academic pressure, part-time work), perceived lack of time, cost of organised sport, safety concerns, body image issues, and availability of appealing and accessible activity options.</p></div>
<div class="stimulus-item"><h3>Stimulus 18: Quote – Experienced Health Promotion Officer on Peer-Led Health Programs in Schools</h3><p>This quote is from an interview with Ms. Sarah Chen, a Health Promotion Officer with over 15 years of experience designing and implementing youth health programs for a regional health service. The interview was part of a review on effective strategies for engaging adolescents in health education, published in a (hypothetical) "Journal of School Health Promotion" in 2023.</p><blockquote><p>"When we\'re trying to convey important health messages to adolescents – whether it\'s about mental wellbeing, respectful relationships, or vaping prevention – we consistently find that the messenger is as important as the message itself. While expert-led sessions have their place, <strong>students are often significantly more likely to actively listen, engage, and internalise health information when it comes from relatable individuals, particularly their slightly older peers.</strong> We\'ve seen that <strong>well-structured peer-led programs, where older students are properly trained and supported to facilitate discussions and activities with younger students, dramatically increase information retention and active participation.</strong> There\'s a level of trust and authenticity that a peer can establish which is sometimes harder for an adult authority figure to achieve. These programs also benefit the peer educators themselves by developing their leadership, communication, and health literacy skills. Of course, careful planning, robust training for peer leaders, and ongoing support from school staff and health professionals are essential for these programs to be effective and safe."</p></blockquote></div>
<div class="stimulus-item"><h3>Stimulus 19: Infographic - How the "Slip, Slop, Slap" & Ottawa Charter Embodies the Ottawa Charter for Health Promotion</h3><p>(Source: Hypothetical Cancer Council educational resource)</p><p>This infographic, titled "<strong>SunSmart Success: The Ottawa Charter in Action – Slip, Slop, Slap, Seek, Slide</strong>," visually deconstructs the long-running and highly effective Australian "Slip, Slop, Slap, Seek, Slide" sun safety campaign, illustrating how its various components align with the five key action areas of the <strong>Ottawa Charter for Health Promotion (WHO, 1986)</strong>. The Ottawa Charter provides a foundational framework for comprehensive health promotion.</p><div><h4>Central Title: SunSmart Success: The Ottawa Charter in Action (with "Slip, Slop, Slap, Seek, Slide" logo)</h4></div><div><h4>1. Develop Personal Skills</h4><p>Icon: Person reading a leaflet / watching TV.</p><p>Text: "Empowering individuals with knowledge and skills to protect themselves from UV radiation."</p><h5>Examples:</h5><ul><li>Mass media advertising campaigns (TV, radio, print, online) educating on UV risks and the 5 sun protection measures.</li><li>Providing information on how to correctly apply sunscreen (e.g., amount, reapplication).</li><li>Teaching people to read and understand UV Index forecasts.</li></ul></div><div><h4>2. Create Supportive Environments</h4><p>Icon: Tree providing shade over a playground.</p><p>Text: "Making the healthy choice the easier choice by modifying environments to support sun safety."</p><h5>Examples:</h5><ul><li>Advocacy for and provision of shade structures in public spaces (playgrounds, pools, sports grounds).</li><li>Policies promoting sun-safe clothing and hat designs (e.g., broad-brimmed hats in school uniform policies).</li><li>Availability of sunscreen in accessible locations (e.g., schools, workplaces).</li></ul></div><div><h4>3. Strengthen Community Action</h4><p>Icon: Group of diverse people working together / community event.</p><p>Text: "Supporting communities to take ownership and action to promote sun safety locally."</p><h5>Examples:</h5><ul><li>SunSmart Schools & Early Childhood Programs – assisting educational settings to develop and implement comprehensive sun protection policies.</li><li>SunSmart Workplaces programs – encouraging businesses with outdoor workers to adopt sun safety practices.</li><li>Local councils and sports clubs implementing sun protection guidelines for events and facilities.</li></ul></div><div><h4>4. Reorient Health Services</h4><p>Icon: Doctor talking to patient / health clinic symbol.</p><p>Text: "Shifting the focus of health services towards prevention and early detection of skin cancer."</p><h5>Examples:</h5><ul><li>Training GPs and other health professionals to routinely provide sun safety advice and conduct skin checks.</li><li>Public awareness campaigns encouraging regular self-skin examinations and visits to doctors for suspicious spots.</li><li>Support for specialised skin cancer clinics.</li></ul></div><div><h4>5. Build Healthy Public Policy</h4><p>Icon: Government building / official document.</p><p>Text: "Developing and advocating for legislation, fiscal measures, and organisational policies that support sun protection."</p><h5>Examples:</h5><ul><li>Regulation of solariums (leading to bans in most states).</li><li>Workplace health and safety regulations requiring employers to protect outdoor workers from UV radiation.</li><li>Lobbying for GST exemption on sunscreen products.</li><li>Standards for sun-protective clothing and sunglasses.</li></ul></div><p>The infographic demonstrates that the success of the "Slip, Slop, Slap, Seek, Slide" campaign is due to its comprehensive, multi-strategy approach, addressing sun safety at individual, community, environmental, and policy levels, consistent with the holistic vision of the Ottawa Charter.</p></div>
<div class="stimulus-item"><h3>Stimulus 20: Case Study - Maria, 70, and Her Experience with the National Disability Insurance Scheme (NDIS) in Rural Victoria</h3><p>Maria is a 70-year-old widow living alone in a small rural town in Victoria, approximately 200km from the nearest major regional centre. She has lived with osteoarthritis in her knees and hips for over a decade, significantly impacting her mobility and ability to perform daily tasks like housekeeping and gardening. Five years ago, she was also diagnosed with persistent moderate depression and anxiety, exacerbated by chronic pain and social isolation following her husband\'s death.</p><p>Maria was approved for the National Disability Insurance Scheme (NDIS) two years ago. The NDIS is Australia\'s national scheme for funding "reasonable and necessary" supports for people with permanent and significant disability, aiming to promote independence, social participation, and economic inclusion through a person-centred approach that emphasises choice and control for participants.</p><h4>Supports Received via NDIS:</h4><ul><li>Funding for fortnightly physiotherapy sessions to manage her osteoarthritis pain and improve mobility.</li><li>Funding for a support worker for 3 hours per week to assist with heavy housework and grocery shopping.</li><li>Funding for a weekly group social support program (e.g., art therapy, gentle exercise class) in a nearby larger town (30km away), including transport costs.</li></ul><h4>Maria\'s Reported Experience:</h4><p>"The NDIS has been a lifeline in some ways. The physio has definitely helped my knees, and having [support worker\'s name] come to help with the cleaning is wonderful – I just couldn\'t manage it anymore. The social group gets me out of the house, which is good for my mood, though the travel can be tiring."</p><h4>Challenges Encountered:</h4><ul><li><strong>Access to Mental Health Support:</strong> "My NDIS plan includes funding for psychology, but there are no NDIS-registered psychologists in my town or the next closest one. The ones in the regional centre have a <strong>6-9 month waiting list</strong>, and many aren\'t taking new NDIS clients. I\'ve tried telehealth, but my internet is unreliable, and I find it hard to connect with someone on a screen for something so personal."</li><li><strong>Provider Availability & Choice:</strong> "There are only two NDIS-registered physios who service my area. While mine is good, if I wanted to change, there isn\'t much choice. It feels like the \'choice and control\' part of NDIS is harder to achieve out here."</li><li><strong>Plan Reviews & Complexity:</strong> "The annual plan review process is very stressful and confusing. I worry they\'ll cut my funding. It\'s a lot of paperwork."</li></ul><p>Maria\'s case study illustrates both the potential benefits of the NDIS in providing essential supports but also highlights significant challenges related to thin markets (lack of service providers) in rural areas, long waiting times for specialised services (particularly mental health), and the administrative burden that can be experienced by participants, which can impact the scheme\'s ability to fully deliver on its principles of access, equity, and empowerment for all eligible Australians, regardless of location.</p></div>
`;

const sampleSacMaterials = [
    {
        id: 'sample1',
        title: 'Sample 1: Youth Mental Health',
        question: "Analyse the impact of social media on the mental wellbeing of adolescents. Use Source A and your own knowledge.",
        stimulus: `<div><p><strong>Source A: The Digital Tightrope (Excerpt from a 2023 report)</strong></p><p>Adolescence is a period of significant brain development, making young people particularly susceptible to environmental influences, including the pervasive presence of social media. Platforms designed for constant engagement can foster comparison and anxiety, potentially impacting self-esteem. Furthermore, exposure to cyberbullying is a recognized risk factor for poor mental health outcomes.</p><p>However, social media can also provide avenues for connection and support, especially for marginalized youth. It allows for the formation of communities based on shared interests and experiences, which can be protective. The key challenge lies in promoting mindful usage and digital literacy.</p></div>`
    },
    {
        id: 'sample2',
        title: 'Sample 2: Healthy Eating Initiatives',
        question: "Evaluate the effectiveness of ONE government initiative and ONE non-government initiative aimed at promoting healthy eating in Australian youth. Use evidence to support your answer.",
        stimulus: `<div><p><strong>Exhibit 1: 'Go for 2&5' Campaign (Government Initiative)</strong></p><p>The 'Go for 2&5' campaign encourages Australians to consume two serves of fruit and five serves of vegetables daily...</p><p><strong>Exhibit 2: Stephanie Alexander Kitchen Garden Program (Non-Government Initiative)</strong></p><p>This program aims to introduce pleasurable food education in primary schools...</p></div>`
    },
    {
        id: 'sample3',
        title: 'Sample 3: Physical Activity Barriers',
        question: "Discuss the sociocultural factors that act as barriers to young people participating in regular physical activity in Australia. Refer to the provided data.",
        stimulus: `<div><p><strong>Figure 1: Physical Activity Levels in Australian Youth (13-17 years) by Socioeconomic Status (SES) Quintile (AIHW, 2022)</strong></p><p><em>Data indicates that young people in the lowest SES quintile (Q1) have a 45% participation rate...</em></p><p><strong>Quote from a youth focus group:</strong> "It's hard to play sports around here..."</p></div>`
    }
];

newQuestions.forEach((question, index) => {
    sampleSacMaterials.push({
        id: `newSampleQ${index + 1}`,
        title: `Practice Question ${index + 1}`,
        question: question,
        stimulus: `<div>${allStimuliHTML}</div>`
    });
});

// Function to safely stringify the sampleSacMaterials array for injection into the script
function stringifySampleSacMaterials(materials) {
    return JSON.stringify(materials, null, 4)
        .replace(/`/g, '\\`') // Escape backticks
        .replace(/\$\{/g, '\\${'); // Escape ${ for template literals
}

const finalSampleSacMaterialsString = stringifySampleSacMaterials(sampleSacMaterials);


export function Unit3SAC2PrepComponent() {
    const ottawaCampaigns = [
        {
            id: 'sunsmart',
            name: 'Slip, Slop, Slap, Seek, Slide (SunSmart Program)',
            primaryHealthIssue: 'Skin cancer prevention (specifically melanoma and non-melanoma skin cancers).',
            originImplementer: 'Originally launched by the Cancer Council Victoria (Australia) in 1981. Now a national program run by Cancer Councils across Australia, often with government support.',
            keyObjectives: [
                'Increase awareness of the dangers of UV radiation and skin cancer.',
                'Promote sun protective behaviours (wearing hats, clothing, sunscreen, seeking shade, wearing sunglasses).',
                'Reduce sunburn rates.',
                'Ultimately reduce the incidence of skin cancer and mortality rates.'
            ],
            mainStrategies: `
                <p>A comprehensive, multi-component campaign that has evolved over decades. Key strategies include:</p>
                <ul>
                    <li><strong>Develop Personal Skills:</strong> Mass media advertising (iconic TV ads, radio, print, online), educational materials for schools and workplaces, information on UV index and how to apply sunscreen correctly.</li>
                    <li><strong>Create Supportive Environments:</strong> Advocacy for shade in public places (playgrounds, pools), promoting sun-safe clothing/hat designs (e.g., school uniform policies), ensuring availability of sunscreen.</li>
                    <li><strong>Strengthen Community Action:</strong> SunSmart Schools and Early Childhood programs, SunSmart Workplaces programs, supporting local councils and sports clubs to implement sun protection policies.</li>
                    <li><strong>Reorient Health Services:</strong> Training GPs on skin cancer detection and sun safety advice, public campaigns for regular skin checks.</li>
                    <li><strong>Build Healthy Public Policy:</strong> Regulation of solariums (leading to bans), WH&S regulations for outdoor workers, lobbying for GST exemption on sunscreen, standards for sun-protective clothing/sunglasses.</li>
                </ul>
            `,
            outcomesImpacts: 'Australia has one of the highest rates of skin cancer globally, but the SunSmart campaign is considered one of the most successful public health campaigns. It has led to significant increases in public awareness, improved sun protection behaviours, and evidence suggests it has contributed to a plateauing or decrease in melanoma rates in younger age groups in Australia. It demonstrates the effectiveness of a long-term, multi-faceted approach aligning with the Ottawa Charter.'
        },
        {
            id: 'quit',
            name: 'Quit / National Tobacco Campaign (Australia)',
            primaryHealthIssue: 'Smoking cessation and prevention of tobacco-related diseases (cancer, cardiovascular disease, respiratory diseases).',
            originImplementer: 'A series of campaigns run by state/territory governments (e.g., Quit Victoria, Cancer Institute NSW) and the federal government, often in partnership with NGOs like the Cancer Council and Heart Foundation.',
            keyObjectives: [
                'Reduce smoking prevalence rates across the population.',
                'Prevent uptake of smoking, particularly among young people.',
                'Increase quit attempts and successful cessation among current smokers.',
                'Raise awareness of the health risks of smoking and secondhand smoke.'
            ],
            mainStrategies: `
                <p>Employs a comprehensive range of strategies, often cited as a global leader in tobacco control:</p>
                <ul>
                    <li><strong>Build Healthy Public Policy:</strong> Significant tobacco tax increases, smoke-free environment legislation (workplaces, pubs, restaurants, public transport), plain packaging laws, bans on tobacco advertising and sponsorship.</li>
                    <li><strong>Develop Personal Skills:</strong> Hard-hitting mass media campaigns depicting health consequences (e.g., "Every cigarette is doing you damage"), Quitline telephone support services, online resources and apps for quitting.</li>
                    <li><strong>Create Supportive Environments:</strong> Promoting smoke-free homes and cars, point-of-sale restrictions on tobacco display.</li>
                    <li><strong>Strengthen Community Action:</strong> Funding for community-based smoking cessation programs, particularly for high-prevalence groups.</li>
                    <li><strong>Reorient Health Services:</strong> Training health professionals to provide brief interventions for smoking cessation, subsidised nicotine replacement therapies (NRTs) via PBS.</li>
                </ul>
            `,
            outcomesImpacts: 'Australia has seen a dramatic reduction in adult daily smoking rates, from around 35% in 1980 to approximately 11% in recent years. This decline is attributed to the sustained, multi-pronged approach. The campaigns have de-normalised smoking and significantly increased public understanding of its harms.'
        },
        {
            id: 'goFor2and5',
            name: 'Go for 2&5 (Fruit & Vegetables)',
            primaryHealthIssue: 'Inadequate fruit and vegetable consumption, contributing to risks of obesity, cardiovascular disease, type 2 diabetes, and some cancers.',
            originImplementer: 'Initially a Western Australian government initiative, later adopted nationally with Horticulture Australia and state health departments.',
            keyObjectives: [
                'Increase awareness of the recommended daily intake of fruit (2 serves) and vegetables (5 serves).',
                'Encourage increased consumption of fruits and vegetables among all age groups.'
            ],
            mainStrategies: `
                <ul>
                    <li><strong>Develop Personal Skills:</strong> Branding and logo, TV commercials, radio ads, print materials (brochures, posters in clinics/schools), website with recipes and tips. Educational resources for schools.</li>
                    <li><strong>Create Supportive Environments:</strong> Point-of-sale promotions in supermarkets, working with school canteens to offer more fruit and vegetable options.</li>
                    <li><strong>Strengthen Community Action:</strong> Community events, partnerships with local health services.</li>
                </ul>
            `,
            outcomesImpacts: 'Achieved high levels of brand recognition. Some studies showed modest short-term increases in awareness and reported intake, particularly for fruit. However, long-term, significant behavioural change across the population has been challenging, with national surveys continuing to show low average vegetable consumption. Highlights the difficulty of changing dietary habits solely through awareness campaigns without broader policy and environmental supports (e.g., affordability, access).'
        },
        {
            id: 'tacRoadSafety',
            name: 'TAC (Transport Accident Commission) Road Safety Campaigns (Victoria, Australia)',
            primaryHealthIssue: 'Road trauma (deaths and serious injuries) from traffic accidents.',
            originImplementer: 'Transport Accident Commission (TAC) Victoria, a government-owned organisation that provides compensation for transport accident victims.',
            keyObjectives: [
                'Reduce the incidence of road accidents and the severity of injuries.',
                'Change driver behaviour related to key risk factors: speeding, drink-driving, drug-driving, fatigue, distraction (e.g., mobile phones), failure to wear seatbelts.'
            ],
            mainStrategies: `
                <p>Known for its confronting, graphic, and emotionally impactful mass media advertising campaigns. Also includes:</p>
                <ul>
                    <li><strong>Build Healthy Public Policy:</strong> Advocacy for and enforcement of road laws (speed limits, blood alcohol limits, seatbelt laws, mobile phone use). Working with road engineers for safer road design. Vehicle safety standards.</li>
                    <li><strong>Develop Personal Skills:</strong> Advertising campaigns targeting specific behaviours and demographics, educational programs for schools and learner drivers.</li>
                    <li><strong>Create Supportive Environments:</strong> Promotion of safer vehicles, variable speed limits in high-risk areas.</li>
                    <li><strong>Strengthen Community Action:</strong> Partnerships with police for enforcement campaigns (e.g., booze buses), community road safety grants.</li>
                </ul>
            `,
            outcomesImpacts: 'Victoria has seen a significant reduction in road fatalities since the TAC began its intensive campaigns in the late 1980s/early 1990s, despite increases in population and vehicle numbers. The TAC campaigns are internationally recognized for their effectiveness in raising awareness and contributing to behaviour change, although attributing specific reductions solely to campaigns is complex due to concurrent improvements in roads, vehicles, and enforcement.'
        },
        {
            id: 'ruok',
            name: 'R U OK?',
            primaryHealthIssue: 'Mental health and suicide prevention.',
            originImplementer: 'An Australian non-profit organisation founded by Gavin Larkin.',
            keyObjectives: [
                'Encourage people to have regular, meaningful conversations with those they are concerned about.',
                'Equip people with the skills and confidence to ask "Are you OK?" and respond appropriately.',
                'Reduce stigma associated with mental illness and seeking help.',
                'Promote community connection and support.'
            ],
            mainStrategies: `
                <ul>
                    <li><strong>Develop Personal Skills:</strong> National "R U OK? Day" (annual event), providing resources (conversation guides, videos, posters) on how to ask the question and support someone. Website with information and resources.</li>
                    <li><strong>Strengthen Community Action:</strong> Encouraging schools, workplaces, and community groups to participate in R U OK? Day and promote a culture of checking in. Partnerships with various organisations.</li>
                    <li><strong>Create Supportive Environments:</strong> Promoting environments where people feel comfortable talking about their mental health.</li>
                </ul>
            `,
            outcomesImpacts: 'Has achieved very high brand recognition and widespread community engagement. Contributed to increased awareness of the importance of social connection and checking in on others. Evaluation shows increased confidence among participants to initiate conversations about mental health. While direct impact on suicide rates is difficult to measure for such a campaign, it plays a significant role in de-stigmatisation and promoting help-seeking behaviour.'
        },
        {
            id: 'swapIt',
            name: 'Swap It, Don\'t Stop It / Make Healthy Normal',
            primaryHealthIssue: 'Overweight and obesity, physical inactivity, unhealthy eating.',
            originImplementer: 'Australian Federal Government (Department of Health), with various state government iterations like "Make Healthy Normal" (NSW).',
            keyObjectives: [
                'Encourage small, achievable healthy lifestyle changes.',
                'Promote healthier eating habits by swapping unhealthy options for healthier ones.',
                'Increase levels of incidental physical activity.',
                'Normalise healthy behaviours.'
            ],
            mainStrategies: `
                <ul>
                    <li><strong>Develop Personal Skills:</strong> Mass media advertising (TV, radio, online) with simple "swap" ideas (e.g., swap sugary drinks for water, swap lift for stairs). Websites with tips, recipes, and activity planners. Mobile apps.</li>
                    <li><strong>Create Supportive Environments:</strong> (To some extent) Partnerships with supermarkets or food outlets to highlight healthier choices.</li>
                    <li><strong>Strengthen Community Action:</strong> Some local community programs and events linked to the campaigns.</li>
                </ul>
            `,
            outcomesImpacts: 'Campaigns generally achieved good awareness. Some self-reported short-term behavioural changes were noted in evaluations. However, similar to "Go for 2&5," achieving sustained population-level impact on obesity and related behaviours has been challenging. These campaigns often face the broader obesogenic environment (high availability of unhealthy foods, car-dependent transport) which can limit individual efforts.'
        },
        {
            id: 'lifeEd',
            name: 'Life Ed (featuring Healthy Harold the Giraffe)',
            primaryHealthIssue: 'Drug and alcohol education, nutrition, personal safety, cyberbullying, mental health for children.',
            originImplementer: 'Life Ed Australia (formerly Healthy Harold), a non-profit organisation.',
            keyObjectives: [
                'Empower children to make safer and healthier choices.',
                'Provide age-appropriate health education in a memorable and engaging way.',
                'Cover topics like nutrition, physical activity, drugs, alcohol, smoking, online safety, and respectful relationships.'
            ],
            mainStrategies: `
                <ul>
                    <li><strong>Develop Personal Skills:</strong> Mobile learning centres (vans) visiting primary schools, featuring interactive sessions with a trained educator and the iconic Healthy Harold the Giraffe puppet. Age-specific modules and resources for students, teachers, and parents. Online resources.</li>
                    <li><strong>Strengthen Community Action:</strong> Works in partnership with schools and local communities. Relies on community funding and volunteers.</li>
                </ul>
            `,
            outcomesImpacts: 'A long-running and highly recognized program in Australian primary schools. Evaluations show high engagement from students and positive feedback from teachers. It contributes to children’s health literacy and knowledge. Measuring long-term behavioural impact is complex, but it plays a key role in early health education.'
        },
        {
            id: 'thisGirlCan',
            name: 'This Girl Can (UK and Victoria, Australia)',
            primaryHealthIssue: 'Physical inactivity among women and girls, addressing fear of judgement as a barrier.',
            originImplementer: 'Originally Sport England (UK), adapted and run by VicHealth in Victoria, Australia.',
            keyObjectives: [
                'Increase physical activity levels among women and girls.',
                'Challenge traditional gender stereotypes about sport and physical activity.',
                'Reduce the "judgement gap" – fear of being judged for appearance, ability, or priorities – as a barrier to participation.',
                'Celebrate active women of all shapes, sizes, ages, and abilities.'
            ],
            mainStrategies: `
                <ul>
                    <li><strong>Develop Personal Skills:</strong> Mass media advertising (TV, online videos, social media) featuring real, relatable women being active, often with a humorous and empowering tone. Storytelling and sharing personal experiences. Website with resources and activity finders.</li>
                    <li><strong>Create Supportive Environments:</strong> Encouraging sports clubs and fitness providers to be more inclusive and welcoming to women. Promoting non-traditional forms of activity.</li>
                    <li><strong>Strengthen Community Action:</strong> Local events, partnerships with community organisations, ambassador programs. Supporting local champions.</li>
                </ul>
            `,
            outcomesImpacts: 'Highly successful in both the UK and Victoria in terms of reach, engagement, and inspiring women to become more active. Evaluations show a significant number of women were motivated by the campaign to start or increase physical activity. It has been praised for its authentic and empowering portrayal of women and for tackling the emotional barriers to participation.'
        },
        {
            id: 'cervicalScreening',
            name: 'The National Cervical Screening Program (Australia)',
            primaryHealthIssue: 'Cervical cancer prevention and early detection.',
            originImplementer: 'Australian Government (Department of Health) and state/territory health departments, with support from organisations like the Cancer Council.',
            keyObjectives: [
                'Reduce the incidence and mortality from cervical cancer.',
                'Increase participation rates in cervical screening (previously Pap tests, now HPV tests).',
                'Ensure timely follow-up and management for women with abnormal results.'
            ],
            mainStrategies: `
                <ul>
                    <li><strong>Build Healthy Public Policy:</strong> A national, organised screening program with defined target populations, screening intervals, and pathways for care. Establishment of a National Cancer Screening Register.</li>
                    <li><strong>Develop Personal Skills:</strong> Public awareness campaigns (TV, radio, print, digital) encouraging eligible individuals to screen, explaining the test and its importance. Targeted communication for under-screened groups (e.g., CALD, Indigenous women). Information for healthcare providers.</li>
                    <li><strong>Reorient Health Services:</strong> Funding for screening services through Medicare, training for GPs and nurses in taking samples, laboratory testing infrastructure. Recall and reminder systems.</li>
                    <li><strong>Strengthen Community Action:</strong> Working with community health organisations and multicultural groups to promote screening in specific communities.</li>
                </ul>
            `,
            outcomesImpacts: 'Australia has one of the lowest rates of cervical cancer in the world, largely due to the success of the National Cervical Screening Program. The program has significantly reduced incidence and mortality since its inception. The recent change from Pap tests to HPV tests is expected to further improve outcomes. Ongoing challenges include maintaining high participation rates and ensuring equitable access for all eligible individuals.'
        },
        {
            id: 'playStreets',
            name: 'Play Streets / Open Streets Initiatives',
            primaryHealthIssue: 'Physical inactivity, particularly in children; lack of safe public spaces for play; social isolation.',
            originImplementer: 'Various local councils, community groups, and NGOs, sometimes with support from state health departments or active transport organisations. Concept originated internationally.',
            keyObjectives: [
                'Increase opportunities for children and communities to be physically active in their local environment.',
                'Create safe, accessible spaces for play and recreation by temporarily closing streets to traffic.',
                'Foster social connection and community cohesion.',
                'Promote active transport (walking, cycling).'
            ],
            mainStrategies: `
                <ul>
                    <li><strong>Create Supportive Environments:</strong> The core strategy is temporarily restricting car access to designated residential streets or public spaces, making them available for play, socialising, and community activities.</li>
                    <li><strong>Strengthen Community Action:</strong> Often community-led or co-designed with local residents. Requires local champions, volunteers, and collaboration between residents and local authorities (e.g., council for permits, traffic management).</li>
                    <li><strong>Develop Personal Skills:</strong> (Indirectly) By providing opportunities for informal play and activity, children can develop movement skills and confidence.</li>
                    <li><strong>Build Healthy Public Policy:</strong> Local council policies and procedures that enable and support Play Streets initiatives (e.g., simplified application processes, provision of resources like signage or traffic cones).</li>
                </ul>
            `,
            outcomesImpacts: 'Growing in popularity in Australia. Evaluations of Play Streets initiatives generally show positive outcomes, including increased physical activity during sessions, enhanced social connections between neighbours, and children reporting more enjoyment of outdoor play. They can transform perceptions of public space and demonstrate the demand for more people-friendly environments. Challenges include sustainability, scaling up, and ensuring equity in access across different neighbourhoods.'
        }
    ];

    const html = `
        <section id="unit3-sac2-prep-page" class="content-section">
            <h2 class="text-3xl font-bold text-purple-400 mb-6 text-center">Unit 3 SAC 2 Preparation</h2>
            <p class="text-center text-slate-400 mb-8">This section provides structured activities and tools to help you prepare for your Unit 3 SACs, particularly focusing on question deconstruction, stimulus annotation, planning, and applying concepts like the Ottawa Charter.</p>

            <article id="interactive-activity-1-wrapper" class="mb-12 p-6 bg-slate-700/50 rounded-xl shadow-xl border border-slate-700">
                <h3 class="text-2xl font-semibold text-purple-300 mb-3">Activity 1: SAC Annotation Practice</h3>
                <p class="mb-4 text-slate-300">Select a sample SAC material below, then use the annotation tools to practice deconstructing the question and annotating the stimulus. Your work for each sample is saved locally in your browser.</p>
                <div id="sample-loader-controls" class="mb-4 p-3 bg-slate-800 rounded-lg flex flex-wrap gap-3 items-center">
                    <div>
                        <label for="sample-material-select" class="block text-sm font-medium text-slate-200 mb-1">Select Sample Material:</label>
                        <select id="sample-material-select" class="w-full sm:w-auto p-2 bg-slate-600 border border-slate-500 rounded text-slate-200 focus:border-purple-500 focus:ring-purple-500">
                            <option value="" disabled selected>-- Select a Sample --</option>
                        </select>
                    </div>
                    <button id="clear-sample-annotations-btn" class="self-end px-3 py-2 bg-red-700 text-white rounded hover:bg-red-600 text-sm">Clear Saved Work for this Sample</button>
                </div>
                <div id="annotation-component-container">
                    <p class="text-slate-400 italic text-center py-4">Select a sample material to load the annotation tool.</p>
                </div>
            </article>

            <article id="interactive-activity-2-wrapper" class="mt-12 mb-12 p-6 bg-slate-700/50 rounded-xl shadow-xl border border-slate-700">
                <h3 class="text-2xl font-semibold text-purple-300 mb-3">Activity 2: Relationship Mapping & TEEL Planning</h3>
                <p class="mb-4 text-slate-300">Use the tools below to create visual maps of relationships between key concepts from the stimulus or your own knowledge, and then structure your arguments using the TEEL paragraph planner. Your work is saved locally.</p>
                <div id="mapping-component-container"> 
                     <p class="text-slate-400 italic text-center py-4">Loading mapping tool...</p>
                </div>
            </article>

            <article id="interactive-activity-3-ottawa" class="mt-12 p-6 bg-slate-700/50 rounded-xl shadow-xl border border-slate-700">
                <h3 class="text-2xl font-semibold text-purple-300 mb-3">Activity 3: Ottawa Charter in Action - Campaign Analysis</h3>
                <p class="mb-4 text-slate-300">Select a health promotion campaign below. Analyse it by identifying the Ottawa Charter action areas used and justifying your choices. Consider its potential strengths, limitations, and promotion of social justice. Your analysis for each campaign is saved locally.</p>

                <div id="ottawa-campaign-selector-wrapper" class="mb-4 p-3 bg-slate-800 rounded-lg">
                    <label for="ottawa-campaign-select" class="block text-sm font-medium text-slate-200 mb-1">Select Campaign:</label>
                    <select id="ottawa-campaign-select" class="w-full p-2 bg-slate-600 border border-slate-500 rounded text-slate-200 focus:border-purple-500 focus:ring-purple-500">
                        <option value="" disabled selected>-- Select a Campaign --</option>
                    </select>
                </div>

                <div id="ottawa-activity-container">
                    <div id="selected-ottawa-campaign-details" class="mb-4 p-3 bg-slate-800 rounded-lg">
                        <h4 class="text-lg font-medium text-purple-200 mb-2">Campaign Scenario: "Active Youth, Healthy Future" (Default Example)</h4>
                        <p class="text-sm text-slate-300">The "Active Youth, Healthy Future" campaign is a state-wide initiative aimed at increasing physical activity levels among adolescents (13-17 years). Key components include:
                            <ul class="list-disc pl-5 mt-2 text-sm text-slate-300 space-y-1">
                                <li>TV and social media advertisements featuring young role models enjoying various sports and activities.</li>
                                <li>Grants provided to local councils to upgrade parks, build new skate parks, and install outdoor gym equipment.</li>
                                <li>A new curriculum module for schools focusing on the benefits of physical activity and fundamental movement skills.</li>
                                <li>Partnerships with local sports clubs to offer discounted memberships for teenagers.</li>
                                <li>A website with resources for parents on how to encourage an active lifestyle.</li>
                                <li>Lobbying for increased funding for school physical education programs.</li>
                            </ul>
                        </p>
                         <p class="text-sm text-slate-400 mt-2"><em>This is a default example. Select another campaign from the dropdown to see its specific details and analyse it.</em></p>
                    </div>
                    <div id="ottawa-charter-analysis-tool" class="mt-4">
                        <h4 class="text-lg font-medium text-purple-200 mb-3">Identify & Justify Ottawa Charter Action Areas:</h4>
                        <div class="space-y-3 mb-4">
                            ${['Build Healthy Public Policy', 'Create Supportive Environments', 'Strengthen Community Action', 'Develop Personal Skills', 'Reorient Health Services'].map(area => `
                                <div class="p-2 border border-slate-600 rounded-md">
                                    <div class="flex items-start mb-1">
                                        <input type="checkbox" id="ottawa-${area.toLowerCase().replace(/\s+/g, '-')}" name="ottawa-action-areas" value="${area}" class="mt-1 h-4 w-4 text-purple-600 border-slate-500 rounded focus:ring-purple-500">
                                        <label for="ottawa-${area.toLowerCase().replace(/\s+/g, '-')}" class="ml-2 text-sm font-medium text-slate-100">${area}</label>
                                    </div>
                                    <textarea id="justify-${area.toLowerCase().replace(/\s+/g, '-')}" class="w-full mt-1 p-1.5 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-400 focus:ring-purple-400 text-slate-200 placeholder-slate-400" rows="2" placeholder="Justify how this action area is present in the campaign..."></textarea>
                                </div>
                            `).join('')}
                        </div>
                        <div class="mb-4">
                            <label for="campaign-strengths" class="block text-sm font-medium text-slate-100 mb-1">Potential Strengths:</label>
                            <textarea id="campaign-strengths" class="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" rows="3" placeholder="e.g., Multi-faceted..."></textarea>
                        </div>
                        <div class="mb-4">
                            <label for="campaign-limitations" class="block text-sm font-medium text-slate-100 mb-1">Potential Limitations:</label>
                            <textarea id="campaign-limitations" class="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" rows="3" placeholder="e.g., May not reach..."></textarea>
                        </div>
                        <div>
                            <label for="campaign-social-justice" class="block text-sm font-medium text-slate-100 mb-1">Social Justice Considerations:</label>
                            <textarea id="campaign-social-justice" class="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" rows="3" placeholder="How does this campaign promote..."></textarea>
                        </div>
                        <button id="save-ottawa-analysis-btn" class="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium">Save Ottawa Analysis</button>
                    </div>
                </div>
            </article>
        </section>
    `;

    // Logic to run after the HTML is injected into the main app-content
    requestAnimationFrame(() => {
        console.log("Unit3SAC2PrepComponent: Main setup logic starting via requestAnimationFrame.");
        const selectElement = document.getElementById('sample-material-select');
        const annotationContainer = document.getElementById('annotation-component-container');
        const mappingContainer = document.getElementById('mapping-component-container');
        const clearSampleAnnotationsButton = document.getElementById('clear-sample-annotations-btn');

        // Ottawa Activity Elements
        const ottawaCampaignSelect = document.getElementById('ottawa-campaign-select');
        const selectedOttawaCampaignDetailsContainer = document.getElementById('selected-ottawa-campaign-details');
        const ottawaAnalysisToolRoot = document.getElementById('ottawa-charter-analysis-tool');
        const saveOttawaAnalysisBtn = document.getElementById('save-ottawa-analysis-btn');
console.log(finalSampleSacMaterialsString);
        const sampleSacMaterials = JSON.parse(finalSampleSacMaterialsString);
        const ANNOTATION_STORAGE_KEY_PREFIX = 'annotationData_U3SAC2_v3_Refactored_';
        const OTTAWA_ANALYSIS_STORAGE_KEY_PREFIX = 'ottawaAnalysis_U3SAC2_';
        const LAST_SELECTED_OTTAWA_CAMPAIGN_KEY = 'lastSelectedOttawaCampaignId_U3SAC2';


        if (selectElement && selectElement.options.length <= 1) { // Populate annotation samples
             sampleSacMaterials.forEach(sample => {
                const option = document.createElement('option');
                option.value = sample.id;
                option.textContent = sample.title;
                selectElement.appendChild(option);
            });
        }
        
        const saveCurrentAnnotationData = () => {
            const currentSampleId = selectElement ? selectElement.value : null;
            if (!currentSampleId || currentSampleId === "") return;
            const deconstructionData = {};
            const deconInputsMap = {
                commandWords: 'decon-command-words-annot', 
                keyConcepts: 'decon-key-concepts-annot',
                contentAreas: 'decon-content-areas-annot',
                constraints: 'decon-constraints-annot'
            };
            for (const key in deconInputsMap) {
                const inputElement = document.getElementById(deconInputsMap[key]);
                if (inputElement) deconstructionData[key] = inputElement.value;
            }
            const stimulusContentAreaAnnot = document.getElementById('stimulus-content-area-annot'); 
            const stimulusHTMLHolder = stimulusContentAreaAnnot ? stimulusContentAreaAnnot.querySelector('#stimulus-text-holder-annot') : null; 
            const stimulusHTML = stimulusHTMLHolder ? stimulusHTMLHolder.innerHTML : "";
            const dataToSave = { deconstruction: deconstructionData, stimulusHTMLWithAnnotations: stimulusHTML };
            try { localStorage.setItem(ANNOTATION_STORAGE_KEY_PREFIX + currentSampleId, JSON.stringify(dataToSave)); } 
            catch (e) { console.error("Error saving annotation data for " + currentSampleId + ":", e); }
        };

        const loadAnnotationToolWithContent = (sampleId) => {
            if (!sampleId) {
                if (annotationContainer) annotationContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">Select a sample material.</p>';
                return;
            }
            const selectedSample = sampleSacMaterials.find(s => s.id === sampleId);
            if (!selectedSample) { console.error("Sample ID not found:", sampleId); return;}
            
            if (annotationContainer) {
                annotationContainer.innerHTML = getInteractiveAnnotationHTML(); 
                requestAnimationFrame(() => { 
                    const annotationInterfaceRoot = document.getElementById('annotation-interface-annot');
                    if(annotationInterfaceRoot) {
                        initInteractiveAnnotationTool(annotationInterfaceRoot); 

                        const questionDisplayP = annotationInterfaceRoot.querySelector('#sac-question-display-annot p'); 
                        const stimulusTextHolder = annotationInterfaceRoot.querySelector('#stimulus-text-holder-annot');

                        if (questionDisplayP) questionDisplayP.textContent = selectedSample.question;
                        else {
                             const qDisplayDiv = annotationInterfaceRoot.querySelector('#sac-question-display-annot');
                             if(qDisplayDiv) qDisplayDiv.innerHTML = `<h4 class="text-lg font-medium text-purple-200 mb-1">Sample SAC Question:</h4><p class="text-slate-300 text-sm">${selectedSample.question}</p>`;
                        }

                        if (stimulusTextHolder) stimulusTextHolder.innerHTML = selectedSample.stimulus;
                        
                        const savedDataRaw = localStorage.getItem(ANNOTATION_STORAGE_KEY_PREFIX + sampleId);
                        let savedData;
                        if (savedDataRaw) { try { savedData = JSON.parse(savedDataRaw); } catch(e) { console.error("Error parsing saved annotation for " + sampleId + ":", e); } }

                        if (savedData && savedData.stimulusHTMLWithAnnotations && stimulusTextHolder) {
                            stimulusTextHolder.innerHTML = savedData.stimulusHTMLWithAnnotations;
                        }
                        
                        const deconstructionInputsMap = {
                            commandWords: 'decon-command-words-annot', keyConcepts: 'decon-key-concepts-annot',
                            contentAreas: 'decon-content-areas-annot', constraints: 'decon-constraints-annot'
                        };
                        for (const key in deconstructionInputsMap) {
                            const inputElement = annotationInterfaceRoot.querySelector(\`#\${deconstructionInputsMap[key]}\`);
                            if (inputElement) {
                                inputElement.value = (savedData && savedData.deconstruction && savedData.deconstruction[key]) ? savedData.deconstruction[key] : '';
                                inputElement.removeEventListener('input', saveCurrentAnnotationData); 
                                inputElement.addEventListener('input', saveCurrentAnnotationData);
                            }
                        }
                        if (typeof window.reAttachAnnotationCommentListeners === 'function') {
                            window.reAttachAnnotationCommentListeners();
                        }
                        ['highlight-btn-annot', 'underline-btn-annot', 'comment-btn-annot'].forEach(btnId => {
                            const btn = annotationInterfaceRoot.querySelector(\`#\${btnId}\`);
                            if (btn) { 
                                const newBtn = btn.cloneNode(true); 
                                btn.parentNode.replaceChild(newBtn, btn);
                                newBtn.addEventListener('click', () => setTimeout(saveCurrentAnnotationData, 150));
                            }
                        });
                        document.dispatchEvent(new Event('annotationToolContentLoaded'));
                    } else {
                        console.error("loadAnnotationToolWithContent: 'annotation-interface-annot' not found after rendering its HTML.");
                    }
                });
            }
        };

        if (selectElement) {
            selectElement.addEventListener('change', (event) => {
                if (event.target.value) { 
                    sessionStorage.setItem('lastSelectedAnnotationSampleId_U3SAC2', event.target.value);
                    loadAnnotationToolWithContent(event.target.value);
                } else {
                     if (annotationContainer) annotationContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">Select a sample material.</p>';
                }
            });
            if (sampleSacMaterials.length > 0) {
                let initialSampleId = sessionStorage.getItem('lastSelectedAnnotationSampleId_U3SAC2');
                if (!initialSampleId || !sampleSacMaterials.find(s => s.id === initialSampleId)) {
                    initialSampleId = ""; 
                }
                selectElement.value = initialSampleId;
                if (initialSampleId) { loadAnnotationToolWithContent(initialSampleId); }
                else if(annotationContainer) { annotationContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">Select a sample material.</p>';}
            }
        }
        
        if (clearSampleAnnotationsButton) {
            clearSampleAnnotationsButton.addEventListener('click', () => {
                const currentSampleId = selectElement ? selectElement.value : null;
                if (currentSampleId && currentSampleId !== "" && confirm(\`Clear saved work for "\${sampleSacMaterials.find(s=>s.id===currentSampleId)?.title}"?"\`)) {
                    localStorage.removeItem(ANNOTATION_STORAGE_KEY_PREFIX + currentSampleId);
                    loadAnnotationToolWithContent(currentSampleId); 
                }
            });
        }

        // Initialize Mapping Tool
        if (mappingContainer) {
            mappingContainer.innerHTML = getInteractiveMappingHTML();
            requestAnimationFrame(() => {
                const actualMappingToolWrapper = document.getElementById('mapping-tool-wrapper');
                if (actualMappingToolWrapper) {
                    initInteractiveMappingTool(actualMappingToolWrapper);
                } else {
                    console.error("Unit3SAC2PrepComponent: CRITICAL - 'mapping-tool-wrapper' NOT found for mapping. Init aborted.");
                    if (mappingContainer) mappingContainer.innerHTML = '<p class="text-red-500 text-center p-4">Error: Failed to load mapping tool (root wrapper not found).</p>';
                }
            });
        } else {
            console.error("Unit3SAC2PrepComponent: ERROR - #mapping-component-container for mapping tool NOT FOUND.");
        }
        
        // --- Ottawa Charter Activity Logic ---
        const populateOttawaCampaignDetails = (campaign) => {
            if (!selectedOttawaCampaignDetailsContainer || !campaign) return;
            selectedOttawaCampaignDetailsContainer.innerHTML = \`
                <h4 class="text-lg font-medium text-purple-200 mb-2">\${campaign.name}</h4>
                <p class="text-sm text-slate-300 mb-1"><strong>Primary Health Issue:</strong> \${campaign.primaryHealthIssue}</p>
                <p class="text-sm text-slate-300 mb-1"><strong>Origin/Implementer:</strong> \${campaign.originImplementer}</p>
                <div class="text-sm text-slate-300 mb-1"><strong>Key Objectives:</strong>
                    <ul class="list-disc pl-5 space-y-1">
                        \${campaign.keyObjectives.map(obj => \`<li>\${obj}</li>\`).join('')}
                    </ul>
                </div>
                <div class="text-sm text-slate-300 mb-1"><strong>Main Strategies:</strong> \${campaign.mainStrategies}</div>
                <p class="text-sm text-slate-300"><strong>Outcomes/Impacts:</strong> \${campaign.outcomesImpacts}</p>
            \`;
        };

        const clearOttawaAnalysisForm = () => {
            if (!ottawaAnalysisToolRoot) return;
            ottawaAnalysisToolRoot.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = false; });
            ottawaAnalysisToolRoot.querySelectorAll('textarea').forEach(ta => { ta.value = ''; });
        };

        const loadOttawaAnalysis = () => {
            if (!ottawaCampaignSelect || !ottawaAnalysisToolRoot) return;
            const selectedCampaignId = ottawaCampaignSelect.value;
            if (!selectedCampaignId) {
                clearOttawaAnalysisForm();
                return;
            }
            const storageKey = OTTAWA_ANALYSIS_STORAGE_KEY_PREFIX + selectedCampaignId;
            const saved = localStorage.getItem(storageKey);
            clearOttawaAnalysisForm(); // Clear form before loading

            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    ottawaAnalysisToolRoot.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = data.actionAreasChecked?.[cb.value] || false; });
                    ottawaAnalysisToolRoot.querySelectorAll('textarea[id^="justify-"]').forEach(ta => {
                        const areaValue = ta.id.substring(8); 
                        const originalAreaName = ['Build Healthy Public Policy', 'Create Supportive Environments', 'Strengthen Community Action', 'Develop Personal Skills', 'Reorient Health Services']
                                                 .find(a => a.toLowerCase().replace(/\s+/g, '-') === areaValue);
                        if(originalAreaName && data.justifications) ta.value = data.justifications[originalAreaName] || '';
                    });
                    const strengthsEl = ottawaAnalysisToolRoot.querySelector('#campaign-strengths'); if (strengthsEl && data.strengths) strengthsEl.value = data.strengths;
                    const limitationsEl = ottawaAnalysisToolRoot.querySelector('#campaign-limitations'); if (limitationsEl && data.limitations) limitationsEl.value = data.limitations;
                    const socialJusticeEl = ottawaAnalysisToolRoot.querySelector('#campaign-social-justice'); if (socialJusticeEl && data.socialJustice) socialJusticeEl.value = data.socialJustice;
                } catch (e) { console.error("Error loading Ottawa analysis for " + selectedCampaignId + ":", e); }
            }
        };

        const saveOttawaAnalysis = () => {
            if (!ottawaCampaignSelect || !ottawaAnalysisToolRoot) return;
            const selectedCampaignId = ottawaCampaignSelect.value;
            if (!selectedCampaignId) {
                alert("Please select a campaign first.");
                return;
            }
            const storageKey = OTTAWA_ANALYSIS_STORAGE_KEY_PREFIX + selectedCampaignId;
            const data = {
                actionAreasChecked: {}, justifications: {},
                strengths: ottawaAnalysisToolRoot.querySelector('#campaign-strengths')?.value || '',
                limitations: ottawaAnalysisToolRoot.querySelector('#campaign-limitations')?.value || '',
                socialJustice: ottawaAnalysisToolRoot.querySelector('#campaign-social-justice')?.value || ''
            };
            ottawaAnalysisToolRoot.querySelectorAll('input[type="checkbox"]').forEach(cb => { data.actionAreasChecked[cb.value] = cb.checked; });
            ottawaAnalysisToolRoot.querySelectorAll('textarea[id^="justify-"]').forEach(ta => {
                 const areaValue = ta.id.substring(8);
                 const originalAreaName = ['Build Healthy Public Policy', 'Create Supportive Environments', 'Strengthen Community Action', 'Develop Personal Skills', 'Reorient Health Services']
                                                 .find(a => a.toLowerCase().replace(/\s+/g, '-') === areaValue);
                if(originalAreaName) data.justifications[originalAreaName] = ta.value;
            });
            localStorage.setItem(storageKey, JSON.stringify(data));
            alert(\`Ottawa Charter analysis for "\${ottawaCampaigns.find(c => c.id === selectedCampaignId)?.name}" saved!\`);
        };

        if (ottawaCampaignSelect) {
            // Populate dropdown
            if (ottawaCampaignSelect.options.length <= 1) { // Only default placeholder
                ottawaCampaigns.forEach(campaign => {
                    const option = document.createElement('option');
                    option.value = campaign.id;
                    option.textContent = campaign.name;
                    ottawaCampaignSelect.appendChild(option);
                });
            }

            ottawaCampaignSelect.addEventListener('change', (event) => {
                const selectedCampaignId = event.target.value;
                if (selectedCampaignId) {
                    const campaign = ottawaCampaigns.find(c => c.id === selectedCampaignId);
                    populateOttawaCampaignDetails(campaign);
                    loadOttawaAnalysis(); // Load analysis for the newly selected campaign
                    sessionStorage.setItem(LAST_SELECTED_OTTAWA_CAMPAIGN_KEY, selectedCampaignId);
                } else {
                    // Clear details and form if "-- Select --" is chosen
                    if(selectedOttawaCampaignDetailsContainer) selectedOttawaCampaignDetailsContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">Select a campaign to view its details and analyse it.</p>';
                    clearOttawaAnalysisForm();
                }
            });

            // Initial load for Ottawa campaign
            let lastSelectedCampaignId = sessionStorage.getItem(LAST_SELECTED_OTTAWA_CAMPAIGN_KEY);
            if (lastSelectedCampaignId && ottawaCampaigns.find(c => c.id === lastSelectedCampaignId)) {
                ottawaCampaignSelect.value = lastSelectedCampaignId;
            } else if (ottawaCampaigns.length > 0) {
                // Select the first campaign if no session history or invalid/default
                ottawaCampaignSelect.value = ottawaCampaigns[0].id;
            }
             // Trigger change to load details and analysis
            if(ottawaCampaignSelect.value){
                const initialCampaign = ottawaCampaigns.find(c => c.id === ottawaCampaignSelect.value);
                populateOttawaCampaignDetails(initialCampaign);
                loadOttawaAnalysis();
            } else {
                 if(selectedOttawaCampaignDetailsContainer) selectedOttawaCampaignDetailsContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">Select a campaign to view its details and analyse it.</p>';
                 clearOttawaAnalysisForm();
            }


        }
        if (saveOttawaAnalysisBtn) saveOttawaAnalysisBtn.addEventListener('click', saveOttawaAnalysis);

        console.log("Unit3SAC2PrepComponent: Main setup logic within requestAnimationFrame COMPLETE.");
    }); 

    return html; 
}
