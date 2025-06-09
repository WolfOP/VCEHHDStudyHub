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
    "Analyse the role of Medicare and the National Disability Insurance Scheme (NDIS) in promoting Australia's health, making reference to the concepts of access and equity. Use information from the sources and your own knowledge.",
    "Using provided stimulus material and your own knowledge, discuss the interdependence of different public health approaches (biomedical, social, old public health) in achieving Australia's current health status.",
    "Evaluate the impact of initiatives to promote healthy eating in Australia and their ability to improve health outcomes, using evidence from the stimulus material and drawing conclusions as to why nutritional improvements are difficult to achieve.",
    "Analyse the strengths and limitations of both the biomedical model and the social model of health in bringing about improvements in health status in Australia, using examples and information from the provided sources.",
    "Using information from the sources and your own knowledge, explain how the roles of the Pharmaceutical Benefits Scheme (PBS) and private health insurance contribute to promoting Australia's health, considering factors such as funding and sustainability.",
    "Drawing on data and case studies provided in the stimulus material, analyse how different public health approaches and health promotion efforts reflecting the action areas of the Ottawa Charter have been used to address factors contributing to the burden of disease in Australia."
];

const stimuli = {
    s1: `<div class="stimulus-item"><h3>Stimulus 1: NHPAs Burden of Disease</h3><canvas id="stimulus1-chart" class="w-full h-64"></canvas></div>`,
    s2: `<div class="stimulus-item"><h3>Stimulus 2: Health Indicators by SES</h3><table class="table-auto text-xs"><thead><tr><th>Indicator</th><th>Low SES</th><th>High SES</th></tr></thead><tbody><tr><td>Life Expectancy</td><td>79</td><td>85</td></tr><tr><td>Daily Smokers %</td><td>22.5</td><td>7.5</td></tr><tr><td>Avoidable Hosp.</td><td>58</td><td>30</td></tr></tbody></table></div>`,
    s3: `<div class="stimulus-item"><h3>Stimulus 3: Health Expenditure 2021-22</h3><canvas id="stimulus3-chart" class="w-full h-64"></canvas></div>`,
    s4: `<div class="stimulus-item"><h3>Stimulus 4: Closing the Gap Snapshot</h3><p>Key targets show limited progress toward reducing life expectancy gaps.</p></div>`,
    s5: `<div class="stimulus-item"><h3>Stimulus 5: Quote from NACCHO CEO Pat Turner</h3><blockquote class="italic">&ldquo;Culturally safe care is essential for our peoples' health.&rdquo;</blockquote></div>`,
    s6: `<div class="stimulus-item"><h3>Stimulus 6: Daily Smoking Rates 1980-2022</h3><canvas id="stimulus6-chart" class="w-full h-64"></canvas></div>`,
    s7: `<div class="stimulus-item"><h3>Stimulus 7: Biomedical vs Social Models</h3><table class="table-auto text-xs"><thead><tr><th>Aspect</th><th>Biomedical</th><th>Social</th></tr></thead><tbody><tr><td>Focus</td><td>Disease treatment</td><td>Prevention & determinants</td></tr><tr><td>Responsibility</td><td>Health professionals</td><td>Shared/community</td></tr></tbody></table></div>`,
    s8: `<div class="stimulus-item"><h3>Stimulus 8: Access to Mental Health Services</h3><p>Map highlighting lower service use in remote areas compared with major cities.</p></div>`,
    s9: `<div class="stimulus-item"><h3>Stimulus 9: AHPF Core Domains</h3><p>Health Status, Determinants of Health, and Health System Performance.</p></div>`,
    s10: `<div class="stimulus-item"><h3>Stimulus 10: Case Study - Jack</h3><p>Young smoker with low physical activity living in outer suburban Melbourne.</p></div>`,
    s11: `<div class="stimulus-item"><h3>Stimulus 11: Preventive Health Strategy Release</h3><p>Aims to cut smoking below 5% and increase physical activity.</p></div>`,
    s14: `<div class="stimulus-item"><h3>Stimulus 14: Australian Dietary Guidelines</h3><ul class="list-disc pl-5 text-xs"><li>Healthy weight</li><li>Variety of foods</li><li>Limit saturated fat, salt, sugar & alcohol</li></ul></div>`,
    s15: `<div class="stimulus-item"><h3>Stimulus 15: Low Vegetable Intake</h3><p>About 8% of adults eat enough vegetables.</p></div>`,
    s16: `<div class="stimulus-item"><h3>Stimulus 16: \"Fuel for Life\" Campaign</h3><p>Hypothetical initiative using social media challenges to boost veggie intake.</p></div>`,
    s19: `<div class="stimulus-item"><h3>Stimulus 19: SunSmart & Ottawa Charter</h3><p>Infographic linking Slip, Slop, Slap, Seek, Slide to Ottawa Charter action areas.</p></div>`,
    s20: `<div class="stimulus-item"><h3>Stimulus 20: Case Study - Maria and the NDIS</h3><p>Maria discusses accessing disability supports in rural Victoria.</p></div>`
};
const campaigns = {
    sunSmart: `<div class="stimulus-item"><h3>Campaign: Slip, Slop, Slap, Seek, Slide</h3><p>Long running skin cancer prevention program encouraging sun protective behaviours.</p></div>`,
    quit: `<div class="stimulus-item"><h3>Campaign: Quit</h3><p>National tobacco control campaign using taxation, legislation and media to reduce smoking rates.</p></div>`,
    ruok: `<div class="stimulus-item"><h3>Campaign: R U OK?</h3><p>Promotes conversations to support mental health and reduce suicide.</p></div>`,
    go25: `<div class="stimulus-item"><h3>Campaign: Go for 2&amp;5</h3><p>Encourages Australians to eat two serves of fruit and five serves of vegetables each day.</p></div>`,
    cervical: `<div class="stimulus-item"><h3>Campaign: National Cervical Screening Program</h3><p>Government program promoting regular cervical screening.</p></div>`,
    playStreets: `<div class="stimulus-item"><h3>Campaign: Play Streets</h3><p>Temporary street closures providing safe spaces for physical activity.</p></div>`,
    swapIt: `<div class="stimulus-item"><h3>Campaign: Swap It, Don't Stop It</h3><p>Encourages small lifestyle swaps to improve diet and activity.</p></div>`,
    thisGirlCan: `<div class="stimulus-item"><h3>Campaign: This Girl Can</h3><p>Inspires women of all abilities to be active without fear of judgement.</p></div>`
};
const questionStimuliMap = {
    1: [stimuli.s6, stimuli.s3, stimuli.s7, stimuli.s1],
    2: [stimuli.s19, stimuli.s7, campaigns.sunSmart, stimuli.s1],
    3: [stimuli.s7, stimuli.s8, stimuli.s10, campaigns.ruok],
    4: [stimuli.s6, stimuli.s11, stimuli.s7, stimuli.s3],
    5: [stimuli.s16, stimuli.s15, stimuli.s14, campaigns.go25],
    6: [stimuli.s6, campaigns.quit, stimuli.s19, stimuli.s7],
    7: [stimuli.s15, stimuli.s10, stimuli.s14, stimuli.s16],
    8: [stimuli.s15, stimuli.s10, stimuli.s14, stimuli.s16],
    9: [stimuli.s5, stimuli.s13, stimuli.s4, stimuli.s19],
    10: [stimuli.s20, stimuli.s8, stimuli.s2, stimuli.s9],
    11: [campaigns.quit, stimuli.s7, stimuli.s3, stimuli.s6],
    12: [stimuli.s7, campaigns.cervical, stimuli.s11, campaigns.playStreets],
    13: [stimuli.s16, stimuli.s15, campaigns.swapIt, stimuli.s10],
    14: [stimuli.s7, stimuli.s8, stimuli.s3, stimuli.s16],
    15: [stimuli.s3, stimuli.s9, stimuli.s7, stimuli.s11],
    16: [stimuli.s1, stimuli.s19, campaigns.thisGirlCan, stimuli.s10]
};
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
    const stimuliHTML = (questionStimuliMap[index + 1] || []).join("");
    sampleSacMaterials.push({
        id: `newSampleQ${index + 1}`,
        title: `Practice Question ${index + 1}`,
        question: question,
        stimulus: `<div>${stimuliHTML}</div>`
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
        document.addEventListener("annotationToolContentLoaded", () => {
            const chart1Ctx = document.getElementById("stimulus1-chart");
            if (chart1Ctx) { Chart.getChart(chart1Ctx)?.destroy(); new Chart(chart1Ctx, {type:"bar",data:{labels:["Cancer","CVD","Injury","Mental","Diabetes","Respiratory"],datasets:[{label:"% DALYs",data:[20,15,10,8,7,5],backgroundColor:"#60a5fa"}]}}); }
            const chart3Ctx = document.getElementById("stimulus3-chart");
            if (chart3Ctx) { Chart.getChart(chart3Ctx)?.destroy(); new Chart(chart3Ctx,{type:"pie",data:{labels:["Hospitals","Primary","Referred","Other"],datasets:[{data:[40,30,20,10],backgroundColor:["#a5b4fc","#f87171","#34d399","#fbbf24"]}]}}); }
            const chart6Ctx = document.getElementById("stimulus6-chart");
            if (chart6Ctx) { Chart.getChart(chart6Ctx)?.destroy(); new Chart(chart6Ctx,{type:"line",data:{labels:["1980","1990","2000","2010","2020","2022"],datasets:[{label:"Smoking %",data:[35,30,22,18,13,11],borderColor:"#f87171",fill:false}]}}); }
        });
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
                            const inputElement = annotationInterfaceRoot.querySelector(`#${deconstructionInputsMap[key]}`);
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
                            const btn = annotationInterfaceRoot.querySelector(`#${btnId}`);
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
                if (currentSampleId && currentSampleId !== "" && confirm(`Clear saved work for "${sampleSacMaterials.find(s=>s.id===currentSampleId)?.title}"?`)) {
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
            selectedOttawaCampaignDetailsContainer.innerHTML = `
                <h4 class="text-lg font-medium text-purple-200 mb-2">${campaign.name}</h4>
                <p class="text-sm text-slate-300 mb-1"><strong>Primary Health Issue:</strong> ${campaign.primaryHealthIssue}</p>
                <p class="text-sm text-slate-300 mb-1"><strong>Origin/Implementer:</strong> ${campaign.originImplementer}</p>
                <div class="text-sm text-slate-300 mb-1"><strong>Key Objectives:</strong>
                    <ul class="list-disc pl-5 space-y-1">
                        ${campaign.keyObjectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
                <div class="text-sm text-slate-300 mb-1"><strong>Main Strategies:</strong> ${campaign.mainStrategies}</div>
                <p class="text-sm text-slate-300"><strong>Outcomes/Impacts:</strong> ${campaign.outcomesImpacts}</p>
            `;
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
            alert(`Ottawa Charter analysis for "${ottawaCampaigns.find(c => c.id === selectedCampaignId)?.name}" saved!`);
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
