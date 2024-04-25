let teller = 0;
let brukerID;

function kjøpBillett() {
    const billett = {
        film : $("#velgFilm").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnr : $("#telefonnr").val(),
        epost : $("#epost").val()
    };

    //Setter/nullstiller telleren til 0
    teller = 0;

    //Inputvalidering for antall, vet ikke hvordan jeg skal gjøre det slik at
    //det bare blir heltall
    if (isNaN(billett.antall) || billett.antall <= 0) {
        let ut = "Antall må være et tall og større enn null";
        ut = ut.fontcolor("RED");
        document.getElementById("feilmeldingAntall").innerHTML = ut;
    }
    else {
        teller++;
    }

    //Valideringer for fornavn, etternavn, telefonnr og epost. Se nederst for funksjonene
    fornavnValidering(billett.fornavn);

    etternavnValidering(billett.etternavn);

    telefonnrValidering(billett.telefonnr);

    epostValidering(billett.epost);

    if (teller === 5) {
        $.post("/lagre", billett, function () {
            hentAlle();
        });
        //nullstiller inputboksene
        $("#velgFilm").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");

        $("#feilmeldingAntall").html("");
        $("#feilmeldingFornavn").html("");
        $("#feilmeldingEtternavn").html("");
        $("#feilmeldingTelefonnr").html("");
        $("#feilmeldingEpost").html("");
    }
}

function hentAlle() {
    $.get("/hentAlle", function (billett) {
        formaterData(billett);
    });
}

function formaterData(billetter) {
    let ut = "<table class='table table-striped'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
        "</tr>";
    for (let b of billetter) {
        ut += "<tr>";
        ut += "<td>"+b.film+"</td><td>"+b.antall+"</td><td>"+b.fornavn+"</td><td>"+b.etternavn+
            "</td><td>"+b.telefonnr+"</td><td>"+b.epost+"</td>";
        ut += "<td> <button class='btn btn-primary' onclick='endreEnBillett("+b.id+")'>Endre</button> </td>";
        ut += "<td> <button class='btn btn-danger' onclick='slettEnBillett("+b.id+")'>Slett</button> </td>";
        ut += "</tr>";
    }
    ut += "</table>";

    $("#billetter").html(ut);
}

function slettAlle() {
    $.get("/slettAlle", function () {
        hentAlle();
    });
}

function slettEnBillett(id) {
    const url = "/slettEnBillett?id=" + id;
    $.get(url, function () {
       hentAlle();
    });
}

function endreEnBillett(id) {
    brukerID = id;
    const url = "/hentEnBillett?id=" + id;
    $.get(url, function (billett) {
        $("#antall").val(billett.antall);
        $("#fornavn").val(billett.fornavn);
        $("#etternavn").val(billett.etternavn);
        $("#telefonnr").val(billett.telefonnr);
        $("#epost").val(billett.epost);
    });

    document.getElementById("endreBillett").style.display = "initial";
    document.getElementById("kjøpBillett").style.display = "none";
}

function fullføreEndringen() {
    const billett = {
        id : brukerID,
        film : $("#velgFilm").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnr : $("#telefonnr").val(),
        epost : $("#epost").val()
    };

    //Setter/nullstiller telleren til 0
    teller = 0;

    //Inputvalidering for antall, vet ikke hvordan jeg skal gjøre det slik at
    //det bare blir heltall
    if (isNaN(billett.antall) || billett.antall <= 0) {
        let ut = "Antall må være et tall og større enn null";
        ut = ut.fontcolor("RED");
        document.getElementById("feilmeldingAntall").innerHTML = ut;
    }
    else {
        teller++;
    }

    //Valideringer for fornavn, etternavn, telefonnr og epost. Se nederst for funksjonene
    fornavnValidering(billett.fornavn);

    etternavnValidering(billett.etternavn);

    telefonnrValidering(billett.telefonnr);

    epostValidering(billett.epost);

    if (teller === 5) {
        $.post("/endreEnBillett", billett, function () {
            hentAlle();
        });
        //nullstiller inputboksene
        $("#velgFilm").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");

        $("#feilmeldingAntall").html("");
        $("#feilmeldingFornavn").html("");
        $("#feilmeldingEtternavn").html("");
        $("#feilmeldingTelefonnr").html("");
        $("#feilmeldingEpost").html("");

        document.getElementById("endreBillett").style.display = "none";
        document.getElementById("kjøpBillett").style.display = "initial";
        hentAlle();
    }
}

function fornavnValidering(fornavn) {
    //Fikk regex-en fra https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
    let fornavnValidering = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

    if (!fornavnValidering.test(fornavn)) {
        let ut = "Ugyldig fornavn";
        ut = ut.fontcolor("RED");
        document.getElementById("feilmeldingFornavn").innerHTML = ut;
    }
    else {
        teller++;
    }
}

function etternavnValidering(etternavn) {
    //Fikk regex-en fra https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
    let etternavnValidering = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

    if (!etternavnValidering.test(etternavn)) {
        let ut = "Ugyldig etternavn";
        ut = ut.fontcolor("RED");
        document.getElementById("feilmeldingEtternavn").innerHTML = ut;
    }
    else {
        teller++;
    }
}

function telefonnrValidering(telefonnr) {
    //Fikk fra en venn, de fra nettet funka ikke
    let telefonnrValidering = /^(\+47)?\d{8}$/;

    if (!telefonnrValidering.test(telefonnr)) {
        let ut = "Ugyldig telefonnr";
        ut = ut.fontcolor("RED");
        document.getElementById("feilmeldingTelefonnr").innerHTML = ut;
    }
    else {
        teller++;
    }
}

function epostValidering(epost) {
    // Fikk regex-en fra https://www.wired.com/2008/08/four-regular-expressions-to-check-email-addresses/
    let epostValidering =  /.+\@.+\..+/;

    if (!epostValidering.test(epost)) {
        let ut = "Ugyldig e-postadresse";
        ut = ut.fontcolor("RED");
        document.getElementById("feilmeldingEpost").innerHTML = ut;
    }
    else {
        teller++;
    }
}
