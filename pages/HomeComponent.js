export function HomeComponent() {
    return `
        <section class="content-section text-center">
            <h1 class="text-5xl font-bold mb-6">Welcome to the HHD Study Hub!</h1>
            <p class="text-xl mb-8">Your central resource for VCE Health and Human Development.</p>
            <img src="https://placehold.co/800x400/1e293b/e2e8f0?text=HHD+Concept+Image" alt="HHD Concept Image" class="mx-auto rounded-lg shadow-lg mb-8" onerror="this.src='https://placehold.co/800x400/1e293b/e2e8f0?text=Image+Not+Available'; this.alt='Image Not Available'">
            <p class="mb-4">This website is designed to help you navigate the complexities of the VCE HHD curriculum, starting with Unit 3 and expanding to Unit 4.</p>
            <p>Explore key knowledge, practice skills, and prepare for your assessments with our curated content.</p>
            <div class="mt-10">
                <a href="#unit3" class="button-style">
                    Explore Unit 3
                </a>
            </div>
        </section>
    `;
}
