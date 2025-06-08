import { getInteractiveAnnotationHTML, initInteractiveAnnotationTool } from './InteractiveAnnotationComponent.js'; 
import { getInteractiveMappingHTML, initInteractiveMappingTool } from './InteractiveMappingComponent.js';

// Note: Chart.js is assumed to be globally available (e.g., via a CDN <script> tag in index.html)
// If not, it would need to be imported: import Chart from 'chart.js/auto';

export function Unit3SAC2PrepComponent() {

    // Comprehensive data store for all stimuli (S1-S20 and Campaign Summaries)
    // Each object includes: stimulusId, title, type, fullHtmlContent (with <canvas id="canvas_STIMULUS_ID"> for charts),
    // and chartJsData (for chart types only, with type, data, options for Chart.js)
    const allStimuliData = [
        // Numbered Stimuli (S1-S20)
        {
            stimulusId: "S1",
            title: "Bar Graph: NHPAs Burden of Disease (DALYs), Australia, 2020",
            type: 'barGraph',
            fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Stimulus 1: Bar Graph - National Health Priority Areas (NHPAs) Burden of Disease (DALYs), Australia, 2020</h3><p>(Source: Hypothetical AIHW-style report)</p><p>This vertical bar graph, titled "<strong>Contribution to Australia\'s Total Disease Burden (DALYs) by Former National Health Priority Areas, 2020</strong>," presents data adapted from the Australian Burden of Disease Study modelling for that year. The Y-axis, labelled "Percentage of Total DALYs (%)" ranges from 0% to 30%, while the X-axis lists major disease and injury groups that were central to Australia\'s former National Health Priority Areas (NHPAs) framework...</p><div class="chart-container" style="position: relative; height:400px; width:80vw; max-width: 600px; margin: auto;"><canvas id="canvas_S1"></canvas></div><p>The data visually underscores that chronic, non-communicable diseases and mental health conditions constituted the majority of disease burden in Australia in 2020...</p></div>`,
            chartJsData: { type: 'bar', data: { labels: ['Cardiovascular Disease', 'All Cancers (combined)', 'Mental & Substance Use Disorders', 'Musculoskeletal Conditions', 'Diabetes Mellitus', 'Asthma', 'Injury'], datasets: [{ label: 'Percentage of Total DALYs (%)', data: [24, 19, 13, 10, 6, 5, 5], backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)', 'rgba(75, 192, 192, 0.7)', 'rgba(153, 102, 255, 0.7)', 'rgba(255, 159, 64, 0.7)', 'rgba(199, 199, 199, 0.7)'], borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(199, 199, 199, 1)'], borderWidth: 1 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 30, title: { display: true, text: 'Percentage of Total DALYs (%)' } } } } }
        },
        {
            stimulusId: "S2", title: "Table: Selected Health Indicators by SES Quintile, Australia, 2022", type: 'table',
            fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Stimulus 2: Table - Selected Health Indicators by Socioeconomic Status (SES) Quintile, Australia, 2022</h3><p>(Source: AIHW)</p><p>This table, titled "Comparison of Key Health Indicators across Socioeconomic Status Quintiles, Persons aged 15-64 years, Australia, 2022," is sourced from the Australian Institute of Health and Welfare (AIHW), Australia’s national agency for health and welfare statistics. It presents a comparison of health outcomes across the Australian population divided into five equal groups, or quintiles, based on their Socioeconomic Status (SES). SES is a composite measure reflecting an individual\'s or group\'s social and economic position, typically determined by income, education level, and occupation, and is recognised as a powerful determinant of health. The clear disparities shown across the quintiles illustrate the social gradient of health, a phenomenon where health outcomes generally improve as socioeconomic position increases.</p><table><thead><tr><th>Health Indicator</th><th>Quintile 1 (Lowest SES)</th><th>Quintile 2</th><th>Quintile 3</th><th>Quintile 4</th><th>Quintile 5 (Highest SES)</th></tr></thead><tbody><tr><td>Life Expectancy at Birth (Years, Avg)</td><td>79.0</td><td>80.5</td><td>81.8</td><td>83.5</td><td>85.0</td></tr><tr><td>Current Daily Smokers (%)</td><td>22.5%</td><td>18.0%</td><td>12.5%</td><td>9.0%</td><td>7.5%</td></tr><tr><td>Avoidable Hospitalisations (per 1000 people)</td><td>58.0</td><td>45.5</td><td>38.0</td><td>32.5</td><td>30.0</td></tr></tbody></table><p>The data reveals a 6-year gap in average life expectancy at birth between the lowest and highest SES quintiles. Rates of current daily smoking, a major modifiable risk factor for numerous diseases, are three times higher in the lowest SES quintile compared to the highest. Furthermore, avoidable hospitalisations – admissions for conditions potentially preventable through timely and adequate non-hospital care (such as effective primary care or management of chronic conditions) – are almost double in the lowest SES quintile. These differences point to significant health inequities driven by variations in living and working conditions, access to resources, exposure to risk factors, and health literacy.</p></div>`, chartJsData: null
        },
        {
            stimulusId: "S3", title: "Pie Chart: Health Expenditure by Sector, Australia, 2021–22", type: 'pieChart',
            fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Stimulus 3: Pie Chart - Distribution of Total Health Expenditure by Sector, Australia, 2021–22</h3><p>(Source: AIHW)</p><p>This pie chart, titled "<strong>Where Australia\'s Health Dollar Was Spent, Total Health Expenditure by Sector, 2021-22</strong>," illustrates the allocation of Australia\'s national health spending across various areas of the health system, based on data from the Australian Institute of Health and Welfare (AIHW). Total health expenditure encompasses spending from all sources, including government, individuals, and private health insurers. The distribution reflects the nation\'s health system priorities and the balance between reactive treatment and proactive prevention.</p><div class="chart-container" style="position: relative; height:400px; width:80vw; max-width: 500px; margin: auto;"><canvas id="canvas_S3"></canvas></div><ul><li><strong>Hospitals (Public & Private Combined):</strong> 39.0%.</li><li><strong>Primary Healthcare:</strong> 23.0%.</li><li><strong>Medications (Pharmaceuticals):</strong> 10.0%.</li><li><strong>Capital Expenditure:</strong> 7.0%.</li><li><strong>Health Administration & Insurance:</strong> 6.7%.</li><li><strong>Medical Research:</strong> 2.0%.</li><li><strong>Public Health Initiatives:</strong> 2.3%.</li><li><strong>Other Recurrent Health Spending:</strong> 10.0%.</li></ul></div>`,
            chartJsData: { type: 'pie', data: { labels: ['Hospitals', 'Primary Healthcare', 'Medications', 'Capital Exp.', 'Admin/Insurance', 'Research', 'Public Health', 'Other'], datasets: [{ data: [39.0, 23.0, 10.0, 7.0, 6.7, 2.0, 2.3, 10.0], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#7A7A7A']}] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom'}, title: {display: true, text: 'Health Expenditure by Sector (%)'}}}}
        },
        { stimulusId: "S4", title: "Infographic: Closing the Gap Progress", type: 'infographic', fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Stimulus 4: Infographic - Closing the Gap – Selected Target Progress, 2023 Snapshot</h3><p>(Source: Adapted from official National Agreement on Closing the Gap data and reports)</p><p>This infographic...provides a visual summary...</p><div><h4>Overall Headline:</h4><p>A prominent statement: "<strong>The Life Expectancy Gap...remains significant...</strong>"</p></div></div>`, chartJsData: null }, // Content further truncated for this example
        { stimulusId: "S5", title: "Quote: NACCHO CEO on Cultural Safety", type: 'quote', fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Stimulus 5: Quote – NACCHO CEO Pat Turner on Culturally Safe Healthcare</h3><p>This is a direct quote...</p><blockquote><p>"Our people have the right to health..."</p></blockquote></div>`, chartJsData: null },
        {
            stimulusId: "S6", title: "Line Graph: Daily Smoking Rates, 1980–2022", type: 'lineGraph',
            fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Stimulus 6: Line Graph - Daily Smoking Rates in Australia, Adults 18+ years, 1980–2022</h3><p>(Source: AIHW)</p><p>This line graph...tracks the percentage...</p><div class="chart-container" style="position: relative; height:400px; width:80vw; max-width: 700px; margin: auto;"><canvas id="canvas_S6"></canvas></div><p>Key policy interventions are marked...</p></div>`,
            chartJsData: { type: 'line', data: { labels: ['1980', '1985', '1990', '1995', '2000', '2005', '2010', '2012', '2015', '2018', '2022'], datasets: [{ label: 'Daily Smoking (%)', data: [35, 30, 28, 25, 22, 19, 16, 15, 13, 12, 11], borderColor: 'rgba(75, 192, 192, 1)', fill: false, tension: 0.1 }] }, options: { responsive: true, maintainAspectRatio: false, scales: {y: {title: {display:true, text:'Daily Smoking Rate (%)'}}}, plugins: {title:{display:true, text:'Trends in Daily Smoking Prevalence (Adults 18+)'}} }}
        },
        { stimulusId: "S7", title: "Table: Biomedical vs. Social Models", type: 'table', fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Table: Biomedical vs. Social Models of Health</h3><p>Comparison table content...</p></div>`, chartJsData: null },
        // S8-S16: Assume full definitions as per previous steps, simplified here for brevity
        { stimulusId: "S8", title: "Map: Mental Health Service Access", type: 'map', fullHtmlContent: '<div><h3>Map...</h3>...</div>', chartJsData: null },
        { stimulusId: "S9", title: "Infographic: AHPF Domains", type: 'infographic', fullHtmlContent: '<div><h3>AHPF...</h3>...</div>', chartJsData: null },
        { stimulusId: "S10", title: "Case Study: Jack (18yo)", type: 'caseStudy', fullHtmlContent: '<div><h3>Jack...</h3>...</div>', chartJsData: null },
        { stimulusId: "S11", title: "Media Release: National Preventive Health Strategy", type: 'mediaRelease', fullHtmlContent: '<div><h3>Nat. Prev. Health Strat...</h3>...</div>', chartJsData: null },
        { stimulusId: "S12", title: "Quote: WHO on SDG 3", type: 'quote', fullHtmlContent: '<div><h3>WHO SDG3...</h3>...</div>', chartJsData: null },
        { stimulusId: "S13", title: "Photo: Aboriginal Health Worker", type: 'photoWithCaption', fullHtmlContent: '<div><h3>Aboriginal Health Worker...</h3>...</div>', chartJsData: null },
        { stimulusId: "S14", title: "Table: Australian Dietary Guidelines", type: 'table', fullHtmlContent: '<div><h3>ADGs...</h3>...</div>', chartJsData: null },
        { stimulusId: "S15", title: "Statistic: Low Vegetable Intake", type: 'statistic', fullHtmlContent: '<div><h3>Low Veg...</h3>...</div>', chartJsData: null },
        { stimulusId: "S16", title: "Campaign Scenario: \"Fuel for Life\"", type: 'campaignScenario', fullHtmlContent: '<div><h3>Fuel for Life...</h3>...</div>', chartJsData: null },
        {
            stimulusId: "S17", title: "Grouped Bar Graph: Physical Activity Levels", type: 'barGraph',
            fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Stimulus 17: Grouped Bar Graph - Physical Activity Levels by Age Group & Gender, Australia, 2021-22</h3><p>(Source: Hypothetical Survey)</p><p>This grouped bar graph... displays data...</p><div class="chart-container" style="position: relative; height:400px; width:80vw; max-width: 700px; margin: auto;"><canvas id="canvas_S17"></canvas></div><p>The graph illustrates a significant decline...</p></div>`,
            chartJsData: { type: 'bar', data: { labels: ["Children (5-11 years)", "Adolescents (12-17 years)", "Young Adults (18-24 years)"], datasets: [{ label: 'Males (%)', data: [80, 55, 48], backgroundColor: 'rgba(54, 162, 235, 0.7)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 }, { label: 'Females (%)', data: [75, 45, 40], backgroundColor: 'rgba(255, 99, 132, 0.7)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 } ] }, options: { responsive: true, maintainAspectRatio: false, scales: {y: { beginAtZero: true, max:100, title:{display:true, text:'Percentage Meeting Guidelines (%)'}}}, plugins:{title:{display:true, text:'Physical Activity Levels by Age & Gender'}}}}
        },
        { stimulusId: "S18", title: "Quote: Peer-Led Health Programs", type: 'quote', fullHtmlContent: '<div><h3>Peer-Led...</h3>...</div>', chartJsData: null },
        { stimulusId: "S19", title: "Infographic: SunSmart & Ottawa Charter", type: 'infographic', fullHtmlContent: '<div><h3>Sunsmart Ottawa...</h3>...</div>', chartJsData: null },
        { stimulusId: "S20", title: "Case Study: Maria & NDIS", type: 'caseStudy', fullHtmlContent: '<div><h3>Maria NDIS...</h3>...</div>', chartJsData: null },
        // Campaign Summaries
        { stimulusId: "CampSunsmart", title: "Campaign Summary: SunSmart", type: 'campaignSummary', fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Campaign: SunSmart</h3><p>Primary Health Issue: Skin cancer prevention. Origin/Implementer: Cancer Council Victoria. Key Objectives: Increase UV awareness, promote sun protective behaviours. Main Strategies: Mass media, education, environmental changes, policy.</p></div>`, chartJsData: null },
        { stimulusId: "CampQuit", title: "Campaign Summary: Quit", type: 'campaignSummary', fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Campaign: Quit</h3><p>Primary Health Issue: Smoking cessation. Origin/Implementer: Governments, NGOs. Key Objectives: Reduce smoking prevalence, prevent uptake. Main Strategies: Policy, mass media, Quitline.</p></div>`, chartJsData: null },
        { stimulusId: "CampGoFor2and5", title: "Campaign Summary: Go for 2&5", type: 'campaignSummary', fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Campaign: Go for 2&5</h3><p>Primary Health Issue: Inadequate fruit/veg consumption. Origin/Implementer: WA Govt, Horticulture Aus. Key Objectives: Increase awareness of 2&5 serves. Main Strategies: Branding, media, school resources.</p></div>`, chartJsData: null },
        { stimulusId: "CampRUOK", title: "Campaign Summary: R U OK?", type: 'campaignSummary', fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Campaign: R U OK?</h3><p>Primary Health Issue: Mental health, suicide prevention. Origin/Implementer: R U OK? (NFP). Key Objectives: Encourage conversations, reduce stigma. Main Strategies: R U OK? Day, resources.</p></div>`, chartJsData: null },
        { stimulusId: "CampNationalCervicalScreening", title: "Campaign Summary: Cervical Screening", type: 'campaignSummary', fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Campaign: Cervical Screening</h3><p>Primary Health Issue: Cervical cancer. Origin/Implementer: Aust. Govt. Key Objectives: Reduce incidence/mortality via screening. Main Strategies: National program, register, awareness campaigns.</p></div>`, chartJsData: null },
        { stimulusId: "CampPlayStreets", title: "Campaign Summary: Play Streets", type: 'campaignSummary', fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Campaign: Play Streets</h3><p>Primary Health Issue: Physical inactivity. Origin/Implementer: Councils, community groups. Key Objectives: Safe play spaces, social connection. Main Strategies: Temporary street closures, community co-design.</p></div>`, chartJsData: null },
        { stimulusId: "CampThisGirlCan", title: "Campaign Summary: This Girl Can", type: 'campaignSummary', fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Campaign: This Girl Can</h3><p>Primary Health Issue: Female physical inactivity. Origin/Implementer: Sport England, VicHealth. Key Objectives: Increase activity, challenge stereotypes. Main Strategies: Relatable media, inclusive sport promotion.</p></div>`, chartJsData: null },
        { stimulusId: "CampSwapIt", title: "Campaign Summary: Swap It", type: 'campaignSummary', fullHtmlContent: `<div class="stimulus-item-content-wrapper"><h3>Campaign: Swap It, Don't Stop It</h3><p>Primary Health Issue: Overweight/obesity. Origin/Implementer: Aust. Govt. Key Objectives: Encourage small healthy changes. Main Strategies: Mass media with "swap" ideas.</p></div>`, chartJsData: null }
    ];

    // Defines the 16 practice questions and their associated stimulus IDs.
    // Renamed from practiceQuestionsAndStimuliPairings for brevity.
    const practiceQuestionsData = [
        { id: "PQ1", title: "Practice Question 1", questionText: "Using the information provided in Stimulus A, B, C and D and your own knowledge, analyse the key reasons for improvements in Australia's health status since 1900, focusing on the impact of 'old' public health initiatives and the biomedical approach to health and improvements in medical technology.", pairedStimulusIds: ["S6", "S3", "S7", "S1"] },
        { id: "PQ2", title: "Practice Question 2", questionText: "Drawing on Stimulus A, B, C and D and your understanding of the social model of health and the Ottawa Charter for Health Promotion, discuss the role of these approaches in promoting health in Australia, with reference to a specific chronic disease.", pairedStimulusIds: ["CampSunsmart", "S2", "S11", "S4"] },
        { id: "PQ3", title: "Practice Question 3", questionText: "In relation to a contemporary health issue (e.g., mental health or overweight and obesity) evident in Stimulus A, B, C and D, use the information from these sources and your own knowledge to justify why a combination of the biomedical and social models of health is needed to reduce the burden of disease associated with this issue.", pairedStimulusIds: ["S10", "S8", "S17", "S7"] },
        { id: "PQ4", title: "Practice Question 4", questionText: "Analyse the changes to public health approaches in Australia over time as suggested by Stimulus A, B, C and D. Explain how these different approaches have contributed to improvements in population health outcomes, using examples from the stimulus material and your own knowledge.", pairedStimulusIds: ["S6", "S19", "S1", "S11"] },
        { id: "PQ5", title: "Practice Question 5", questionText: "Evaluate the effectiveness of one health promotion strategy or initiative from Stimulus A, B, C or D in addressing a significant health issue in Australia. Make reference to the social model of health or action areas of the Ottawa Charter in your evaluation.", pairedStimulusIds: ["CampQuit", "S16", "S15", "S2"] },
        { id: "PQ6", title: "Practice Question 6", questionText: "Using data or trends presented in Stimulus A, B, C and D showing changes in health status over time, explain how the contributions of the social model of health and the Ottawa Charter for Health Promotion have likely influenced these observed patterns.", pairedStimulusIds: ["S1", "S6", "S4", "S12"] },
        { id: "PQ7", title: "Practice Question 7", questionText: "Analyse the challenges in bringing about nutritional change in Australia, linking these challenges to relevant sociocultural and commercial factors evident in Stimulus A, B, C and D. Evaluate how initiatives to promote healthy eating, such as the Australian Dietary Guidelines (ADGs) or the Healthy Eating Pyramid, attempt to address these challenges.", pairedStimulusIds: ["S15", "S14", "CampGoFor2and5", "S16"] },
        { id: "PQ8", title: "Practice Question 8", questionText: "Drawing on Stimulus A, B, C and D and your own knowledge, analyse how two action areas of the Ottawa Charter for Health Promotion are reflected in a health promotion program (such as one mentioned in the stimuli) aimed at improving Aboriginal and Torres Strait Islander Peoples’ health. Evaluate the program's capacity to promote social justice and improve health outcomes.", pairedStimulusIds: ["S4", "S5", "S13", "CampNationalCervicalScreening"] },
        { id: "PQ9", title: "Practice Question 9", questionText: "Analyse the role of Medicare and the National Disability Insurance Scheme (NDIS) in promoting Australia's health, making reference to the concepts of access and equity. Use information from Stimulus A, B, C and D and your own knowledge.", pairedStimulusIds: ["S20", "S3", "S8", "S2"] },
        { id: "PQ10", title: "Practice Question 10", questionText: "Using provided Stimulus A, B, C and D and your own knowledge, discuss the interdependence of different public health approaches (biomedical, social, 'old' public health) in achieving Australia's current health status.", pairedStimulusIds: ["S7", "S1", "S6", "S11"] },
        { id: "PQ11", title: "Practice Question 11", questionText: "Explain how initiatives similar to those associated with the 'old' public health were used in response to a contemporary health challenge (e.g., a pandemic like COVID-19 or managing infectious diseases) using principles from Stimulus A, B, C and D. Justify why both the biomedical and social models of health are important in addressing this challenge.", pairedStimulusIds: ["S7", "S12", "CampQuit", "S3"] },
        { id: "PQ12", title: "Practice Question 12", questionText: "Evaluate the impact of initiatives to promote healthy eating in Australia (such as those in Stimulus A, B, C or D) and their ability to improve health outcomes. Use evidence from the stimulus material and draw conclusions as to why nutritional improvements are difficult to achieve.", pairedStimulusIds: ["S15", "S16", "CampGoFor2and5", "S14"] },
        { id: "PQ13", title: "Practice Question 13", questionText: "Analyse the strengths and limitations of both the biomedical model and the social model of health in bringing about improvements in health status in Australia, using examples and information from Stimulus A, B, C and D.", pairedStimulusIds: ["S7", "S1", "S10", "S20"] },
        { id: "PQ14", title: "Practice Question 14", questionText: "Using information from Stimulus A, B, C and D and your own knowledge, explain how the roles of the Pharmaceutical Benefits Scheme (PBS) and private health insurance contribute to promoting Australia's health, considering factors such as funding and sustainability.", pairedStimulusIds: ["S3", "S2", "S7", "S20"] },
        { id: "PQ15", title: "Practice Question 15", questionText: "Drawing on data and case studies provided in Stimulus A, B, C and D, analyse how different public health approaches and health promotion efforts reflecting the action areas of the Ottawa Charter have been used to address factors contributing to the burden of disease in Australia.", pairedStimulusIds: ["S1", "S10", "CampThisGirlCan", "S19"] },
        { id: "PQ16", title: "Practice Question 16", questionText: "Discuss the challenges and opportunities in using community-led initiatives (such as those in Stimulus A, B, C or D) to address health inequities in Australia. Refer to concepts of social justice and empowerment in your response.", pairedStimulusIds: ["CampPlayStreets", "CampRUOK", "S5", "S13"] }
    ];

    // `sampleSacMaterials` is the primary data structure for Activity 1's dropdown.
    // Each item represents a selectable practice question, with its associated stimuli objects directly embedded.
    const sampleSacMaterials = practiceQuestionsData.map(questionEntry => {
        return {
            id: questionEntry.id, // e.g., "PQ1"
            title: questionEntry.title, // e.g., "Practice Question 1"
            questionText: questionEntry.questionText,
            stimuli: questionEntry.pairedStimulusIds.map(id => { // Array of 4 full stimulus objects
                const stimulus = allStimuliData.find(s => s.stimulusId === id);
                if (!stimulus) console.warn(`Stimulus with ID "${id}" not found for question "${questionEntry.id}".`);
                return stimulus;
            }).filter(s => s) // Filter out any not found, though all should be found
        };
    });

    // Data for Activity 3: Ottawa Charter Campaign Analysis
    const ottawaCampaignsData = [
        { id: 'sunsmart', name: 'Slip, Slop, Slap, Seek, Slide (SunSmart Program)', primaryHealthIssue: 'Skin cancer prevention (specifically melanoma and non-melanoma skin cancers).', originImplementer: 'Originally launched by the Cancer Council Victoria (Australia) in 1981. Now a national program run by Cancer Councils across Australia, often with government support.', keyObjectives: [ 'Increase awareness of the dangers of UV radiation and skin cancer.', 'Promote sun protective behaviours (wearing hats, clothing, sunscreen, seeking shade, wearing sunglasses).', 'Reduce sunburn rates.', 'Ultimately reduce the incidence of skin cancer and mortality rates.' ], mainStrategies: `<p>A comprehensive, multi-component campaign that has evolved over decades. Key strategies include:</p><ul><li><strong>Develop Personal Skills:</strong> Mass media advertising (iconic TV ads, radio, print, online), educational materials for schools and workplaces, information on UV index and how to apply sunscreen correctly.</li><li><strong>Create Supportive Environments:</strong> Advocacy for shade in public places (playgrounds, pools), promoting sun-safe clothing/hat designs (e.g., school uniform policies), ensuring availability of sunscreen.</li><li><strong>Strengthen Community Action:</strong> SunSmart Schools and Early Childhood programs, SunSmart Workplaces programs, supporting local councils and sports clubs to implement sun protection policies.</li><li><strong>Reorient Health Services:</strong> Training GPs on skin cancer detection and sun safety advice, public campaigns for regular skin checks.</li><li><strong>Build Healthy Public Policy:</strong> Regulation of solariums (leading to bans), WH&S regulations for outdoor workers, lobbying for GST exemption on sunscreen, standards for sun-protective clothing/sunglasses.</li></ul>`, outcomesImpacts: 'Australia has one of the highest rates of skin cancer globally, but the SunSmart campaign is considered one of the most successful public health campaigns. It has led to significant increases in public awareness, improved sun protection behaviours, and evidence suggests it has contributed to a plateauing or decrease in melanoma rates in younger age groups in Australia. It demonstrates the effectiveness of a long-term, multi-faceted approach aligning with the Ottawa Charter.' },
        { id: 'quit', name: 'Quit / National Tobacco Campaign (Australia)', primaryHealthIssue: 'Smoking cessation and prevention of tobacco-related diseases (cancer, cardiovascular disease, respiratory diseases).', originImplementer: 'A series of campaigns run by state/territory governments (e.g., Quit Victoria, Cancer Institute NSW) and the federal government, often in partnership with NGOs like the Cancer Council and Heart Foundation.', keyObjectives: [ 'Reduce smoking prevalence rates across the population.', 'Prevent uptake of smoking, particularly among young people.', 'Increase quit attempts and successful cessation among current smokers.', 'Raise awareness of the health risks of smoking and secondhand smoke.' ], mainStrategies: `<p>Employs a comprehensive range of strategies, often cited as a global leader in tobacco control:</p><ul><li><strong>Build Healthy Public Policy:</strong> Significant tobacco tax increases, smoke-free environment legislation (workplaces, pubs, restaurants, public transport), plain packaging laws, bans on tobacco advertising and sponsorship.</li><li><strong>Develop Personal Skills:</strong> Hard-hitting mass media campaigns depicting health consequences (e.g., "Every cigarette is doing you damage"), Quitline telephone support services, online resources and apps for quitting.</li><li><strong>Create Supportive Environments:</strong> Promoting smoke-free homes and cars, point-of-sale restrictions on tobacco display.</li><li><strong>Strengthen Community Action:</strong> Funding for community-based smoking cessation programs, particularly for high-prevalence groups.</li><li><strong>Reorient Health Services:</strong> Training health professionals to provide brief interventions for smoking cessation, subsidised nicotine replacement therapies (NRTs) via PBS.</li></ul>`, outcomesImpacts: 'Australia has seen a dramatic reduction in adult daily smoking rates, from around 35% in 1980 to approximately 11% in recent years. This decline is attributed to the sustained, multi-pronged approach. The campaigns have de-normalised smoking and significantly increased public understanding of its harms.' },
        // ... (other 8 ottawaCampaignsData objects as defined in previous steps) ...
        { id: 'goFor2and5', name: 'Go for 2&5 (Fruit & Vegetables)', primaryHealthIssue: 'Inadequate fruit and vegetable consumption...', originImplementer: 'Initially a Western Australian government initiative...', keyObjectives: ['Increase awareness...'], mainStrategies: '<ul>...</ul>', outcomesImpacts: 'Achieved high levels of brand recognition...' },
        { id: 'tacRoadSafety', name: 'TAC (Transport Accident Commission) Road Safety Campaigns (Victoria, Australia)', primaryHealthIssue: 'Road trauma...', originImplementer: 'Transport Accident Commission (TAC) Victoria...', keyObjectives: ['Reduce the incidence...'], mainStrategies: '<p>...</p>', outcomesImpacts: 'Victoria has seen a significant reduction...' },
        { id: 'ruok', name: 'R U OK?', primaryHealthIssue: 'Mental health and suicide prevention.', originImplementer: 'An Australian non-profit organisation...', keyObjectives: ['Encourage people to have regular...'], mainStrategies: '<ul>...</ul>', outcomesImpacts: 'Has achieved very high brand recognition...' },
        { id: 'swapIt', name: 'Swap It, Don\'t Stop It / Make Healthy Normal', primaryHealthIssue: 'Overweight and obesity...', originImplementer: 'Australian Federal Government...', keyObjectives: ['Encourage small, achievable...'], mainStrategies: '<ul>...</ul>', outcomesImpacts: 'Campaigns generally achieved good awareness...' },
        { id: 'lifeEd', name: 'Life Ed (featuring Healthy Harold the Giraffe)', primaryHealthIssue: 'Drug and alcohol education...', originImplementer: 'Life Ed Australia...', keyObjectives: ['Empower children to make safer...'], mainStrategies: '<ul>...</ul>', outcomesImpacts: 'A long-running and highly recognized program...' },
        { id: 'thisGirlCan', name: 'This Girl Can (UK and Victoria, Australia)', primaryHealthIssue: 'Physical inactivity among women...', originImplementer: 'Sport England (UK), VicHealth...', keyObjectives: ['Increase physical activity levels...'], mainStrategies: '<ul>...</ul>', outcomesImpacts: 'Highly successful in both the UK and Victoria...' },
        { id: 'cervicalScreening', name: 'The National Cervical Screening Program (Australia)', primaryHealthIssue: 'Cervical cancer prevention...', originImplementer: 'Australian Government...', keyObjectives: ['Reduce the incidence and mortality...'], mainStrategies: '<ul>...</ul>', outcomesImpacts: 'Australia has one of the lowest rates of cervical cancer...' },
        { id: 'playStreets', name: 'Play Streets / Open Streets Initiatives', primaryHealthIssue: 'Physical inactivity, particularly in children...', originImplementer: 'Various local councils, community groups...', keyObjectives: ['Increase opportunities for children...'], mainStrategies: '<ul>...</ul>', outcomesImpacts: 'Growing in popularity in Australia...' }
    ];


    const html = `
        <section id="unit3-sac2-prep-page" class="content-section">
            <h2 class="text-3xl font-bold text-purple-400 mb-6 text-center">Unit 3 SAC 2 Preparation</h2>
            <p class="text-center text-slate-400 mb-8">This section provides structured activities and tools to help you prepare for your Unit 3 SACs, particularly focusing on question deconstruction, stimulus annotation, planning, and applying concepts like the Ottawa Charter.</p>

            <article id="interactive-activity-1-wrapper" class="mb-12 p-6 bg-slate-700/50 rounded-xl shadow-xl border border-slate-700">
                <h3 class="text-2xl font-semibold text-purple-300 mb-3">Activity 1: SAC Annotation Practice</h3>
                <p class="mb-4 text-slate-300">Select a practice question below. The associated stimuli will be displayed in collapsible sections. Use the annotation tools to practice deconstructing the question and annotating the stimuli. Your work for each question is saved locally in your browser.</p>
                <div id="sample-loader-controls" class="mb-4 p-3 bg-slate-800 rounded-lg flex flex-wrap gap-3 items-center">
                    <div>
                        <label for="sample-material-select" class="block text-sm font-medium text-slate-200 mb-1">Select Practice Question:</label>
                        <select id="sample-material-select" class="w-full sm:w-auto p-2 bg-slate-600 border border-slate-500 rounded text-slate-200 focus:border-purple-500 focus:ring-purple-500">
                            <option value="" disabled selected>-- Select a Question --</option>
                        </select>
                    </div>
                    <button id="clear-sample-annotations-btn" class="self-end px-3 py-2 bg-red-700 text-white rounded hover:bg-red-600 text-sm">Clear Saved Work for this Question</button>
                </div>
                <div id="annotation-component-container">
                    <p class="text-slate-400 italic text-center py-4">Select a practice question to load the annotation tool and stimuli.</p>
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
                         <p class="text-slate-400 italic text-center py-4">Select a campaign to view its details and analyse it.</p>
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

    requestAnimationFrame(() => {
        console.log("Unit3SAC2PrepComponent: Main setup logic starting.");
        const sampleSelectElement = document.getElementById('sample-material-select');
        const annotationContainer = document.getElementById('annotation-component-container');
        const mappingContainer = document.getElementById('mapping-component-container');
        const clearSampleAnnotationsButton = document.getElementById('clear-sample-annotations-btn');

        const ottawaCampaignSelect = document.getElementById('ottawa-campaign-select');
        const selectedOttawaCampaignDetailsContainer = document.getElementById('selected-ottawa-campaign-details');
        const ottawaAnalysisToolRoot = document.getElementById('ottawa-charter-analysis-tool');
        const saveOttawaAnalysisBtn = document.getElementById('save-ottawa-analysis-btn');

        const ANNOTATION_STORAGE_KEY_PREFIX = 'annotationData_U3SAC2_PQ_';
        const OTTAWA_ANALYSIS_STORAGE_KEY_PREFIX = 'ottawaAnalysis_U3SAC2_';
        const LAST_SELECTED_OTTAWA_CAMPAIGN_KEY = 'lastSelectedOttawaCampaignId_U3SAC2';
        const LAST_SELECTED_ANNOTATION_QUESTION_KEY = 'lastSelectedAnnotationQuestionId_U3SAC2';

        // Holds Chart.js instances for the currently displayed stimuli in Activity 1
        let currentAnnotationChartInstances = [];

        /**
         * Renders a single Chart.js chart if data is provided and it hasn't been rendered yet.
         * @param {object} stimulus - The stimulus object, containing chartJsData.
         * @param {HTMLCanvasElement} canvasEl - The canvas element to render the chart on.
         */
        const renderSingleChartIfNeeded = (stimulus, canvasEl) => {
            if (!stimulus.chartJsData || !canvasEl || canvasEl.chartInstance) {
                // No chart data, canvas element not found, or chart already rendered on this canvas.
                return;
            }
            if (!window.Chart) {
                console.error("Chart.js is not loaded. Cannot render chart for " + stimulus.stimulusId);
                const parent = canvasEl.parentNode;
                if (parent && !parent.querySelector('.chartjs-load-error')) { // Prevent multiple error messages
                    const errorMsg = document.createElement('p');
                    errorMsg.textContent = 'Chart.js library not loaded. Cannot display chart.';
                    errorMsg.className = 'text-red-500 text-center chartjs-load-error';
                    parent.insertBefore(errorMsg, canvasEl); // Display error message before the canvas
                }
                return;
            }
            try {
                const ctx = canvasEl.getContext('2d');
                // Deep clone data and options to prevent Chart.js from mutating the original source data
                const chartData = JSON.parse(JSON.stringify(stimulus.chartJsData.data));
                const chartOptions = JSON.parse(JSON.stringify(stimulus.chartJsData.options));

                const newChartInstance = new Chart(ctx, {
                    type: stimulus.chartJsData.type,
                    data: chartData,
                    options: chartOptions
                });
                canvasEl.chartInstance = newChartInstance; // Store instance on the canvas element itself
                currentAnnotationChartInstances.push(newChartInstance); // Add to global tracking array
            } catch (e) {
                console.error(`Error rendering chart for ${stimulus.stimulusId}:`, e);
            }
        };

        /**
         * Destroys all currently active Chart.js instances for Activity 1 stimuli.
         * Called when a new question is loaded or the view is cleared.
         */
        const destroyCurrentAnnotationCharts = () => {
            currentAnnotationChartInstances.forEach(chart => {
                if (chart && typeof chart.destroy === 'function') {
                    chart.destroy();
                }
            });
            currentAnnotationChartInstances = []; // Reset the tracking array

            // Remove chartInstance property from all relevant canvas elements
            const canvases = document.querySelectorAll('#annotation-component-container canvas'); // Target canvases within Activity 1
            canvases.forEach(canvas => {
                if (canvas.chartInstance) {
                    delete canvas.chartInstance;
                }
            });
        };

        // Populate practice question dropdown for Activity 1
        if (sampleSelectElement && sampleSelectElement.options.length <= 1) { // Ensure not already populated
             sampleSacMaterials.forEach(question => {
                const option = document.createElement('option');
                option.value = question.id; // e.g., "PQ1"
                option.textContent = question.title; // e.g., "Practice Question 1"
                sampleSelectElement.appendChild(option);
            });
        }
        
        /**
         * Saves deconstruction notes for the current question in Activity 1.
         * Note: stimulusHTMLWithAnnotations is explicitly not saved to preserve dynamic collapsible structure.
         */
        const saveCurrentAnnotationData = () => {
            const currentQuestionId = sampleSelectElement ? sampleSelectElement.value : null;
            if (!currentQuestionId || currentQuestionId === "") return;
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
            const dataToSave = {
                deconstruction: deconstructionData,
                stimulusHTMLWithAnnotations: "NOT_SAVED_TO_PRESERVE_STRUCTURE" // See note in function description
            };
            try { localStorage.setItem(ANNOTATION_STORAGE_KEY_PREFIX + currentQuestionId, JSON.stringify(dataToSave)); }
            catch (e) { console.error("Error saving annotation data for " + currentQuestionId + ":", e); }
        };

        /**
         * Loads the annotation tool with the selected question and its associated stimuli.
         * Handles rendering of stimuli in collapsible sections and on-demand chart rendering.
         * @param {string} questionId - The ID of the question to load (e.g., "PQ1").
         */
        const loadAnnotationToolWithContent = (questionId) => {
            destroyCurrentAnnotationCharts(); // Clear any charts from a previously selected question

            if (!questionId) { // No question selected
                if (annotationContainer) annotationContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">Select a practice question.</p>';
                return;
            }
            const selectedQuestion = sampleSacMaterials.find(q => q.id === questionId);
            if (!selectedQuestion) {
                console.error("Question ID not found:", questionId);
                if (annotationContainer) annotationContainer.innerHTML = '<p class="text-red-500 text-center py-4">Error: Selected question not found.</p>';
                return;
            }
            
            if (annotationContainer) {
                annotationContainer.innerHTML = getInteractiveAnnotationHTML(); 
                requestAnimationFrame(() => { // Ensure DOM is ready for annotation tool
                    const annotationInterfaceRoot = document.getElementById('annotation-interface-annot');
                    if(annotationInterfaceRoot) {
                        initInteractiveAnnotationTool(annotationInterfaceRoot); 

                        const questionDisplayDiv = annotationInterfaceRoot.querySelector('#sac-question-display-annot');
                        if (questionDisplayDiv) {
                             questionDisplayDiv.innerHTML = \`<h4 class="text-lg font-medium text-purple-200 mb-1">Practice Question: \${selectedQuestion.title}</h4><p class="text-slate-300 text-sm">\${selectedQuestion.questionText}</p>\`;
                        }

                        const stimulusTextHolder = annotationInterfaceRoot.querySelector('#stimulus-text-holder-annot');
                        if (stimulusTextHolder) {
                            stimulusTextHolder.innerHTML = ''; // Clear previous stimuli
                            // Iterate over the stimuli array for the selected question
                            selectedQuestion.stimuli.forEach((stimulus, index) => {
                                const stimulusWrapper = document.createElement('div');
                                stimulusWrapper.className = 'stimulus-container border border-slate-600 rounded-md mb-3';
                                stimulusWrapper.dataset.stimulusActualId = stimulus.stimulusId; // For potential future use/debugging

                                const titleHeader = document.createElement('div');
                                titleHeader.className = 'stimulus-title-header bg-slate-700 p-2 cursor-pointer hover:bg-slate-600 rounded-t-md flex justify-between items-center';
                                // Display stimulus letter (A, B, C, D)
                                titleHeader.innerHTML = \`<span>\${stimulus.title} (Stimulus \${String.fromCharCode(65 + index)})</span><span class="stimulus-toggle-icon text-purple-400 text-xl font-bold">+</span>\`;

                                const contentDiv = document.createElement('div');
                                contentDiv.className = 'stimulus-content p-2 border-t border-slate-600';
                                contentDiv.style.display = 'none'; // Initially hidden
                                contentDiv.innerHTML = stimulus.fullHtmlContent; // Contains the HTML, including <canvas> for charts

                                stimulusWrapper.appendChild(titleHeader);
                                stimulusWrapper.appendChild(contentDiv);
                                stimulusTextHolder.appendChild(stimulusWrapper);

                                // Event listener for toggling and rendering chart on demand
                                titleHeader.addEventListener('click', () => {
                                    const isHidden = contentDiv.style.display === 'none';
                                    contentDiv.style.display = isHidden ? 'block' : 'none';
                                    titleHeader.querySelector('.stimulus-toggle-icon').textContent = isHidden ? '−' : '+';

                                    if (isHidden) { // If content is now shown
                                        const canvasId = `canvas_${stimulus.stimulusId}`;
                                        const canvasElement = contentDiv.querySelector(`#${canvasId}`); // Query within its own contentDiv
                                        if (canvasElement) {
                                            renderSingleChartIfNeeded(stimulus, canvasElement);
                                        }
                                    }
                                });
                            });
                        }
                        
                        const savedDataRaw = localStorage.getItem(ANNOTATION_STORAGE_KEY_PREFIX + questionId);
                        let savedData;
                        if (savedDataRaw) { try { savedData = JSON.parse(savedDataRaw); } catch(e) { console.error("Error parsing saved annotation for " + questionId + ":", e); } }

                        // Load deconstruction notes.
                        // stimulusHTMLWithAnnotations is not reloaded to preserve the dynamic collapsible structure and event listeners.
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
                            // Pass stimulusTextHolder if the annotation tool needs to scope its listeners
                            window.reAttachAnnotationCommentListeners(stimulusTextHolder);
                        }
                        // Re-bind annotation tool buttons if they were part of getInteractiveAnnotationHTML and need specific handlers here
                        ['highlight-btn-annot', 'underline-btn-annot', 'comment-btn-annot'].forEach(btnId => {
                             const btn = annotationInterfaceRoot.querySelector(\`#\${btnId}\`);
                            if (btn) {
                                const newBtn = btn.cloneNode(true);
                                btn.parentNode.replaceChild(newBtn, btn);
                                // Event listeners for these buttons are typically handled within initInteractiveAnnotationTool
                                // or reAttachAnnotationCommentListeners. If they also need to trigger saveCurrentAnnotationData:
                                // newBtn.addEventListener('click', () => setTimeout(saveCurrentAnnotationData, 150));
                            }
                        });
                        document.dispatchEvent(new Event('annotationToolContentLoaded'));
                    } else {
                        console.error("loadAnnotationToolWithContent: 'annotation-interface-annot' not found after rendering its HTML.");
                    }
                });
            }
        };

        // Event listener for practice question selection
        if (sampleSelectElement) {
            sampleSelectElement.addEventListener('change', (event) => {
                if (event.target.value) {
                    sessionStorage.setItem(LAST_SELECTED_ANNOTATION_QUESTION_KEY, event.target.value);
                    loadAnnotationToolWithContent(event.target.value);
                } else {
                     if (annotationContainer) annotationContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">Select a practice question.</p>';
                     destroyCurrentAnnotationCharts(); // Clear charts if no question is selected
                }
            });
            // Initial load for Activity 1: Load last selected question or default to empty state
            if (sampleSacMaterials.length > 0) {
                let initialQuestionId = sessionStorage.getItem(LAST_SELECTED_ANNOTATION_QUESTION_KEY);
                if (!initialQuestionId || !sampleSacMaterials.find(q => q.id === initialQuestionId)) {
                    initialQuestionId = ""; // No valid last selection or default to empty
                }
                sampleSelectElement.value = initialQuestionId; // Set dropdown
                if (initialQuestionId) {
                    loadAnnotationToolWithContent(initialQuestionId); // Load content if there's an initial ID
                } else if (annotationContainer) {
                    annotationContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">Select a practice question.</p>'; // Default message
                }
            }
        }

        // Event listener for clearing saved annotations for the current question
        if (clearSampleAnnotationsButton) {
            clearSampleAnnotationsButton.addEventListener('click', () => {
                const currentQuestionId = sampleSelectElement ? sampleSelectElement.value : null;
                if (currentQuestionId && currentQuestionId !== "" && confirm(\`Clear saved work for "\${sampleSacMaterials.find(q=>q.id===currentQuestionId)?.title}"?\`)) {
                    localStorage.removeItem(ANNOTATION_STORAGE_KEY_PREFIX + currentQuestionId);
                    loadAnnotationToolWithContent(currentQuestionId); // Reload to clear inputs and reflect cleared state
                }
            });
        }

        // Initialize Mapping Tool for Activity 2
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
        }

        // --- Ottawa Charter Activity Logic (Activity 3) ---
        // Helper function to populate campaign details in Activity 3
        const populateOttawaCampaignDetails = (campaign) => {
            if (!selectedOttawaCampaignDetailsContainer || !campaign) return;
            selectedOttawaCampaignDetailsContainer.innerHTML = \`
                <h4 class="text-lg font-medium text-purple-200 mb-2">\${campaign.name}</h4>
                <p class="text-sm text-slate-300 mb-1"><strong>Primary Health Issue:</strong> \${campaign.primaryHealthIssue}</p>
                <p class="text-sm text-slate-300 mb-1"><strong>Origin/Implementer:</strong> \${campaign.originImplementer}</p>
                <div class="text-sm text-slate-300 mb-1"><strong>Key Objectives:</strong>
                    <ul class="list-disc pl-5 space-y-1">\${campaign.keyObjectives.map(obj => \`<li>\${obj}</li>\`).join('')}</ul>
                </div>
                <div class="text-sm text-slate-300 mb-1"><strong>Main Strategies:</strong> \${campaign.mainStrategies}</div>
                <p class="text-sm text-slate-300"><strong>Outcomes/Impacts:</strong> \${campaign.outcomesImpacts}</p>
            \`;
        };
        // Helper function to clear the Ottawa analysis form
        const clearOttawaAnalysisForm = () => {
            if (!ottawaAnalysisToolRoot) return;
            ottawaAnalysisToolRoot.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = false; });
            ottawaAnalysisToolRoot.querySelectorAll('textarea').forEach(ta => { ta.value = ''; });
        };
        // Loads saved analysis for the selected Ottawa campaign
        const loadOttawaAnalysis = () => {
            if (!ottawaCampaignSelect || !ottawaAnalysisToolRoot) return;
            const selectedCampaignId = ottawaCampaignSelect.value;
            if (!selectedCampaignId) { clearOttawaAnalysisForm(); return; }
            const storageKey = OTTAWA_ANALYSIS_STORAGE_KEY_PREFIX + selectedCampaignId;
            const saved = localStorage.getItem(storageKey);
            clearOttawaAnalysisForm();
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    ottawaAnalysisToolRoot.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = data.actionAreasChecked?.[cb.value] || false; });
                    ottawaAnalysisToolRoot.querySelectorAll('textarea[id^="justify-"]').forEach(ta => { const areaValue = ta.id.substring(8); const originalAreaName = ['Build Healthy Public Policy', 'Create Supportive Environments', 'Strengthen Community Action', 'Develop Personal Skills', 'Reorient Health Services'].find(a => a.toLowerCase().replace(/\s+/g, '-') === areaValue); if(originalAreaName && data.justifications) ta.value = data.justifications[originalAreaName] || ''; });
                    const strengthsEl = ottawaAnalysisToolRoot.querySelector('#campaign-strengths'); if (strengthsEl && data.strengths) strengthsEl.value = data.strengths;
                    const limitationsEl = ottawaAnalysisToolRoot.querySelector('#campaign-limitations'); if (limitationsEl && data.limitations) limitationsEl.value = data.limitations;
                    const socialJusticeEl = ottawaAnalysisToolRoot.querySelector('#campaign-social-justice'); if (socialJusticeEl && data.socialJustice) socialJusticeEl.value = data.socialJustice;
                } catch (e) { console.error("Error loading Ottawa analysis for " + selectedCampaignId + ":", e); }
            }
        };
        // Saves the current Ottawa campaign analysis to localStorage
        const saveOttawaAnalysis = () => {
            if (!ottawaCampaignSelect || !ottawaAnalysisToolRoot) return;
            const selectedCampaignId = ottawaCampaignSelect.value;
            if (!selectedCampaignId) { alert("Please select a campaign first."); return; }
            const storageKey = OTTAWA_ANALYSIS_STORAGE_KEY_PREFIX + selectedCampaignId;
            const data = { actionAreasChecked: {}, justifications: {}, strengths: ottawaAnalysisToolRoot.querySelector('#campaign-strengths')?.value || '', limitations: ottawaAnalysisToolRoot.querySelector('#campaign-limitations')?.value || '', socialJustice: ottawaAnalysisToolRoot.querySelector('#campaign-social-justice')?.value || '' };
            ottawaAnalysisToolRoot.querySelectorAll('input[type="checkbox"]').forEach(cb => { data.actionAreasChecked[cb.value] = cb.checked; });
            ottawaAnalysisToolRoot.querySelectorAll('textarea[id^="justify-"]').forEach(ta => { const areaValue = ta.id.substring(8); const originalAreaName = ['Build Healthy Public Policy', 'Create Supportive Environments', 'Strengthen Community Action', 'Develop Personal Skills', 'Reorient Health Services'].find(a => a.toLowerCase().replace(/\s+/g, '-') === areaValue); if(originalAreaName) data.justifications[originalAreaName] = ta.value; });
            localStorage.setItem(storageKey, JSON.stringify(data));
            alert(\`Ottawa Charter analysis for "\${ottawaCampaignsData.find(c => c.id === selectedCampaignId)?.name}" saved!\`);
        };

        // Setup for Activity 3: Ottawa Charter Campaigns
        if (ottawaCampaignSelect) {
            if (ottawaCampaignSelect.options.length <= 1 && ottawaCampaignsData && ottawaCampaignsData.length > 0) { // Check ottawaCampaignsData
                ottawaCampaignsData.forEach(campaign => {
                    const option = document.createElement('option');
                    option.value = campaign.id;
                    option.textContent = campaign.name;
                    ottawaCampaignSelect.appendChild(option);
                });
            }
            ottawaCampaignSelect.addEventListener('change', (event) => {
                const selectedCampaignId = event.target.value;
                if (selectedCampaignId) {
                    const campaign = ottawaCampaignsData.find(c => c.id === selectedCampaignId);
                    populateOttawaCampaignDetails(campaign);
                    loadOttawaAnalysis();
                    sessionStorage.setItem(LAST_SELECTED_OTTAWA_CAMPAIGN_KEY, selectedCampaignId);
                } else {
                    if(selectedOttawaCampaignDetailsContainer) selectedOttawaCampaignDetailsContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">Select a campaign to view its details and analyse it.</p>';
                    clearOttawaAnalysisForm();
                }
            });
            // Initial load for Ottawa campaign
            let lastSelectedCampaignId = sessionStorage.getItem(LAST_SELECTED_OTTAWA_CAMPAIGN_KEY);
            if (ottawaCampaignsData && ottawaCampaignsData.length > 0) { // Check ottawaCampaignsData before use
                 if (!lastSelectedCampaignId || !ottawaCampaignsData.find(c => c.id === lastSelectedCampaignId)) {
                    lastSelectedCampaignId = ottawaCampaignsData[0].id;
                }
                ottawaCampaignSelect.value = lastSelectedCampaignId;
                if(ottawaCampaignSelect.value) {
                    const initialCampaign = ottawaCampaignsData.find(c => c.id === ottawaCampaignSelect.value);
                    if(initialCampaign) populateOttawaCampaignDetails(initialCampaign);
                    loadOttawaAnalysis();
                }
            } else if(selectedOttawaCampaignDetailsContainer) { // Default message if no campaigns
                 selectedOttawaCampaignDetailsContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">No campaign data available.</p>';
                 clearOttawaAnalysisForm();
            }
        }
        if (saveOttawaAnalysisBtn) saveOttawaAnalysisBtn.addEventListener('click', saveOttawaAnalysis);

        console.log("Unit3SAC2PrepComponent: Main setup logic COMPLETE.");
    }); 

    return html; 
}
