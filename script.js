document.addEventListener("DOMContentLoaded", () => {


    /*
    ===============================
    DONNÉES DU CONTACT
    ===============================
    */

    const contact = {

        firstname: "Mario",

        lastname: "JODAR",

        phone: "+33674648976",

        email: "mario.jodar34@gmail.com",

        website: "",

        github: "",

        linkedin: "https://linkedin.com/in/mario-jodar",

        job: "Ancien Chargé de Secteur - CS504"

    };



    /*
    ===============================
    CRÉATION DU FICHIER VCF
    ===============================
    */


    function createVCard() {


        const vcf = 
`BEGIN:VCARD
VERSION:3.0
N:${contact.lastname};${contact.firstname};;;
FN:${contact.firstname} ${contact.lastname}
TITLE:${contact.job}
TEL;TYPE=CELL:${contact.phone}
EMAIL:${contact.email}
URL:${contact.website}
NOTE:GitHub : ${contact.github}
NOTE:LinkedIn : ${contact.linkedin}
END:VCARD`;


        return vcf;

    }



    /*
    ===============================
    TÉLÉCHARGEMENT VCF
    ===============================
    */


    const downloadButton =
        document.querySelector("#downloadVCF");


    if(downloadButton){


        downloadButton.addEventListener(
            "click",
            () => {


                const blob = new Blob(
                    [createVCard()],
                    {
                        type:"text/vcard;charset=utf-8"
                    }
                );


                const url =
                    URL.createObjectURL(blob);


                const link =
                    document.createElement("a");


                link.href = url;

                link.download =
                    `${contact.firstname}_${contact.lastname}.vcf`;


                document.body.appendChild(link);

                link.click();


                document.body.removeChild(link);


                URL.revokeObjectURL(url);


            }
        );


    }



    /*
    ===============================
    COPIE PRESSE-PAPIER
    ===============================
    */


    const copyButtons =
        document.querySelectorAll(".copy-btn");



    copyButtons.forEach(button => {


        button.addEventListener(
            "click",
            async () => {


                const value =
                    button.dataset.copy;


                try {


                    await navigator.clipboard.writeText(value);


                    const oldText =
                        button.textContent;


                    button.textContent =
                        "✓ Copié";


                    setTimeout(() => {


                        button.textContent =
                            oldText;


                    },1500);



                }

                catch(error){

                    console.error(
                        "Copie impossible",
                        error
                    );

                }


            }
        );


    });



    /*
    ===============================
    PARTAGE NATIF MOBILE
    ===============================
    */


    const shareButton =
        document.querySelector("#shareCard");



    if(shareButton){


        shareButton.addEventListener(
            "click",
            async () => {


                const shareData = {


                    title:
                    `${contact.firstname} ${contact.lastname}`,


                    text:
                    "Mes coordonnées : ",


                    url:
                    contact.website


                };



                if(
                    navigator.share
                ){


                    try {


                        await navigator.share(
                            shareData
                        );


                    }

                    catch(error){

                        console.log(
                            "Partage annulé"
                        );

                    }


                }

                else {


                    alert(
                        "Le partage natif n'est pas disponible sur ce navigateur."
                    );


                }


            }
        );


    }



});
