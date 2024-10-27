document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();
    const imageFile = document.getElementById("file").files[0];
    formData.append("file", imageFile);

    const uploadedImage = document.getElementById("uploadedImage");
    const uploadedImageContainer = document.getElementById("uploadedImageContainer");
    uploadedImage.src = URL.createObjectURL(imageFile); // Set the src to the uploaded file
    uploadedImageContainer.style.display = "block"; // Show the image container

    try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (result.predicted_class) {
            document.getElementById("result").innerText = "Predicted Species: " + result.predicted_class;
            displaySpeciesDetails(result.predicted_class);
        } else {
            document.getElementById("result").innerText = "Error: " + result.error;
        }
    } catch (error) {
        console.error("Error:", error);
        
    }
});

function displaySpeciesDetails(species) {
    let details = '';

    switch (species.toLowerCase()) {
        case 'cottonmouth':
            details = `
                <div class="species-details-container">
                    <h2>Cottonmouth </h2>
                    <h3>Basic Information</h3>
                    <div class="species-detail"><strong>Common Name:</strong> Cottonmouth, Water Moccasin</div>
                    <div class="species-detail"><strong>Scientific Name:</strong> Agkistrodon piscivorus</div>
                    <div class="species-detail"><strong>Family:</strong> Viperidae</div>
                    <div class="species-detail"><strong>Distribution:</strong> Southeastern United States</div>
                    <div class="species-detail"><strong>Habitat:</strong> Aquatic environments, swamps, marshes, and rivers</div>
                      <div class="species-detail"><strong>Diet:</strong> Fish, frogs, small mammals, birds</div>
                    <div class="species-detail"><strong>Predators:</strong> Larger snakes, alligators, birds of prey</div>
                    <div class="species-detail"><strong>Reproduction:</strong> Live birth</div>
                    <div class="species-detail"><strong>Activity Patterns:</strong> Primarily diurnal</div>

                    <h3>Physical Characteristics</h3>
                    <div class="species-detail"><strong>Size:</strong> Up to 4 feet</div>
                    <div class="species-detail"><strong>Coloration:</strong> Dark brown to black with a broad, dark band across the head</div>
                    <div class="species-detail"><strong>Scale Patterns:</strong> Keeled scales</div>
                    <div class="species-detail"><strong>Head Shape:</strong> Triangular head</div>
                    

                    
                  

                    <h3>Conservation Status</h3>
                    <div class="species-detail"><strong>Threat Level:</strong> Least Concern</div>
                    <div class="species-detail"><strong>Conservation Efforts:</strong> No specific conservation efforts, but habitat protection is crucial</div>

                    <h3>Safety Information</h3>
                    <div class="species-detail"><strong>Venom:</strong> Hematotoxic venom causing tissue damage</div>
                    <div class="species-detail"><strong>First Aid:</strong> Seek immediate medical attention</div>
                    <div class="species-detail"><strong>Prevention:</strong> Avoid swimming or wading in known cottonmouth habitats</div>
                </div>
            `;
            break;
        case 'eastern racer':
            details = `
                <div class="species-details-container">
                    <h2>Eastern Racer</h2>
                    <h3>Basic Information</h3>
                    <div class="species-detail"><strong>Common Name:</strong> Eastern Racer</div>
                    <div class="species-detail"><strong>Scientific Name:</strong> Coluber constrictor</div>
                    <div class="species-detail"><strong>Family:</strong> Colubridae</div>
                    <div class="species-detail"><strong>Distribution:</strong> Eastern United States</div>
                    <div class="species-detail"><strong>Habitat:</strong> Diverse habitats, including forests, fields, and swamps</div>
                    <div class="species-detail"><strong>Diet:</strong> Rodents, lizards, frogs, birds</div>
                    <div class="species-detail"><strong>Predators:</strong> Hawks, owls, larger snakes</div>
                    <div class="species-detail"><strong>Reproduction:</strong> Egg-laying</div>
                    <div class="species-detail"><strong>Activity Patterns:</strong> Diurnal</div>

                    <h3>Physical Characteristics</h3>
                    <div class="species-detail"><strong>Size:</strong> Up to 6 feet</div>
                    <div class="species-detail"><strong>Coloration:</strong> Typically black or brown</div>
                    <div class="species-detail"><strong>Scale Patterns:</strong> Smooth scales</div>
                    <div class="species-detail"><strong>Head Shape:</strong> Distinctly shaped head with large eyes</div>
                    

                    
                    

                    <h3>Conservation Status</h3>
                    <div class="species-detail"><strong>Threat Level:</strong> Least Concern</div>
                    <div class="species-detail"><strong>Conservation:</strong> No specific conservation efforts</div>

                    <h3>Safety Information</h3>
                    <div class="species-detail"><strong>Venom:</strong> Non-venomous</div>
                    <div class="species-detail"><strong>First Aid:</strong> Not applicable</div>
                    <div class="species-detail"><strong>Prevention:</strong> Observe from a distance</div>
                </div>
            `;
            break;
        case 'western diamondback rattlesnake':
            details = `
                <div class="species-details-container">
                    <h2>Western Diamondback Rattlesnake </h2>
                    <h3>Basic Information</h3>
                    <div class="species-detail"><strong>Common Name:</strong> Western Diamondback Rattlesnake</div>
                    <div class="species-detail"><strong>Scientific Name:</strong> Crotalus atrox</div>
                    <div class="species-detail"><strong>Family:</strong> Viperidae</div>
                    <div class="species-detail"><strong>Distribution:</strong> Southwestern United States and northern Mexico</div>
                    <div class="species-detail"><strong>Habitat:</strong> Deserts, grasslands, rocky areas</div>
                    <div class="species-detail"><strong>Diet:</strong> Small mammals, birds, reptiles</div>
                    <div class="species-detail"><strong>Predators:</strong> Hawks, owls, coyotes</div>
                    <div class="species-detail"><strong>Reproduction:</strong> Live birth</div>
                    <div class="species-detail"><strong>Activity Patterns:</strong> Primarily nocturnal</div>

                    <h3>Physical Characteristics</h3>
                    <div class="species-detail"><strong>Size:</strong> Up to 7 feet</div>
                    <div class="species-detail"><strong>Coloration:</strong> Gray, brown, or olive with diamond-shaped markings</div>
                    <div class="species-detail"><strong>Scale Patterns:</strong> Keeled scales</div>
                    <div class="species-detail"><strong>Head Shape:</strong> Triangular head with a rattle</div>
                 
                   
                    

                    <h3>Conservation Status</h3>
                    <div class="species-detail"><strong>Threat Level:</strong> Least Concern</div>
                    <div class="species-detail"><strong>Conservation:</strong> No specific conservation efforts, but habitat protection is crucial</div>

                    <h3>Safety Information</h3>
                    <div class="species-detail"><strong>Venom:</strong> Potent hemotoxic and neurotoxic venom</div>
                    <div class="species-detail"><strong>First Aid:</strong> Seek immediate medical attention</div>
                    <div class="species-detail"><strong>Prevention:</strong> Wear protective gear when hiking in rattlesnake habitats</div>
                </div>
            `;
            break;
        case 'rough earth snake':
            details = `
                <div class="species-details-container">
                    <h2>Rough Earth Snake </h2>
                    <h3>Basic Information</h3>
                    <div class="species-detail"><strong>Common Name:</strong> Rough Earth Snake</div>
                    <div class="species-detail"><strong>Scientific Name:</strong> Haldea striatula</div>
                    <div class="species-detail"><strong>Family:</strong> Colubridae</div>
                    <div class="species-detail"><strong>Distribution:</strong> Eastern United States</div>
                    <div class="species-detail"><strong>Habitat:</strong> Forests, woodlands, and gardens</div>
                    <div class="species-detail"><strong>Diet:</strong> Earthworms and soft-bodied invertebrates</div>
                    <div class="species-detail"><strong>Predators:</strong> Birds and larger snakes</div>
                    <div class="species-detail"><strong>Reproduction:</strong> Egg-laying</div>
                    <div class="species-detail"><strong>Activity Patterns:</strong> Nocturnal</div>

                    <h3>Physical Characteristics</h3>
                    <div class="species-detail"><strong>Size:</strong> Up to 12 inches</div>
                    <div class="species-detail"><strong>Coloration:</strong> Brown or gray with darker stripes</div>
                    <div class="species-detail"><strong>Scale Patterns:</strong> Keeled scales</div>
                    <div class="species-detail"><strong>Head Shape:</strong> Small, rounded head</div>
                   

                    

                    <h3>Conservation Status</h3>
                    <div class="species-detail"><strong>Threat Level:</strong> Least Concern</div>
                    <div class="species-detail"><strong>Conservation:</strong> No specific conservation efforts</div>

                    <h3>Safety Information</h3>
                    <div class="species-detail"><strong>Venom:</strong> Non-venomous</div>
                    <div class="species-detail"><strong>First Aid:</strong> Not applicable</div>
                    <div class="species-detail"><strong>Prevention:</strong> Observe from a distance</div>
                </div>
            `;
            break;
        case 'grass snake':
            details = `
                <div class="species-details-container">
                    <h2>Grass Snake </h2>
                    <h3>Basic Information</h3>
                    <div class="species-detail"><strong>Common Name:</strong> Grass Snake</div>
                    <div class="species-detail"><strong>Scientific Name:</strong> Natrix natrix</div>
                    <div class="species-detail"><strong>Family:</strong> Colubridae</div>
                    <div class="species-detail"><strong>Distribution:</strong> Europe and parts of Asia</div>
                    <div class="species-detail"><strong>Habitat:</strong> Near water bodies, wetlands, and grasslands</div>
                    <div class="species-detail"><strong>Diet:</strong> Frogs, fish, and small rodents</div>
                    <div class="species-detail"><strong>Predators:</strong> Birds of prey, mammals</div>
                    <div class="species-detail"><strong>Reproduction:</strong> Egg-laying</div>
                    <div class="species-detail"><strong>Activity Patterns:</strong> Diurnal</div>

                    <h3>Physical Characteristics</h3>
                    <div class="species-detail"><strong>Size:</strong> Up to 3 feet</div>
                    <div class="species-detail"><strong>Coloration:</strong> Olive green or brown with yellow or white neck markings</div>
                    <div class="species-detail"><strong>Scale Patterns:</strong> Smooth scales</div>
                    <div class="species-detail"><strong>Head Shape:</strong> Distinct head with round pupils</div>
                  

                      

                    <h3>Conservation Status</h3>
                    <div class="species-detail"><strong>Threat Level:</strong> Least Concern</div>
                    <div class="species-detail"><strong>Conservation:</strong> Protected in some regions</div>

                    <h3>Safety Information</h3>
                    <div class="species-detail"><strong>Venom:</strong> Non-venomous</div>
                    <div class="species-detail"><strong>First Aid:</strong> Not applicable</div>
                    <div class="species-detail"><strong>Prevention:</strong> Observe from a distance</div>
                </div>
            `;
            break;
        default:
            details = '<div class="species-details-container">Species not found.</div>';
    }

    document.getElementById("speciesDetails").innerHTML = details;
    document.getElementById("speciesModal").style.display = "block";
}

