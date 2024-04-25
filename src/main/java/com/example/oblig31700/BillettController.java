package com.example.oblig31700;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {
    @Autowired
    private BillettRepository repository;

    @PostMapping("/lagre")
    public void lagre(Billett innbillett, HttpServletResponse response) throws IOException {
        if (!repository.lagreBillett(innbillett)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i database");
        }
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle(HttpServletResponse response) throws IOException {
        List<Billett> alleBilletter = repository.hentAlleBilletter();
        if (alleBilletter == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i databasen");
        }
        return alleBilletter;
    }

    @GetMapping("/hentEnBillett")
    public Billett hentEnBillett(int id, HttpServletResponse response) throws IOException {
        Billett enBillett = repository.hentEnBillett(id);
        if (enBillett == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i database");
        }
        return enBillett;
    }

    @PostMapping("/endreEnBillett")
    public void endreEnBillett(Billett innBillett, HttpServletResponse response) throws IOException {
        if (!repository.endreEnBillett(innBillett)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i database");
        }
    }

    @GetMapping("/slettEnBillett")
    public void slettEnBillett(int id, HttpServletResponse response) throws IOException {
        if (!repository.slettEnBillett(id)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i database");
        }
    }

    @GetMapping("/slettAlle")
    public void slettAlleBilletter(HttpServletResponse response) throws IOException {
        if (!repository.slettAlleBilletter()) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i database");
        }
    }
}

