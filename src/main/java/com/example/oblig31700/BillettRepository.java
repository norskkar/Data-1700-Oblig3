package com.example.oblig31700;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.logging.Logger;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate dataBase;

    private Logger logger = Logger.getLogger(BillettRepository.class.getName());

    public boolean lagreBillett(Billett b) {
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        try {
            dataBase.update(sql, b.getFilm(), b.getAntall(), b.getFornavn(), b.getEtternavn(),
            b.getTelefonnr(), b.getEpost());
            return true;
        }
        catch (Exception e) {
            logger.severe("Feil i lagre billett: " + e);
            return false;
        }
    }

    public List<Billett> hentAlleBilletter() {
        String sql = "SELECT * FROM Billett ORDER BY etternavn ASC";
        try {
            return dataBase.query(sql, new BeanPropertyRowMapper(Billett.class));
        }
        catch (Exception e) {
            logger.severe("Feil i hent alle billetter: " + e);
            return null;
        }
    }

    public Billett hentEnBillett(int id) {
        String sql = "SELECT * FROM Billett WHERE id = ?";
        try {
            Billett enBillett = dataBase.queryForObject(sql, BeanPropertyRowMapper.newInstance(Billett.class),id);
            return enBillett;
        }
        catch (Exception e) {
            logger.severe("Feil i hent en billett: "+e);
            return null;
        }
    }

    public boolean endreEnBillett(Billett b) {
        String sql = "UPDATE Billett SET film = ?, antall = ?, fornavn = ?, etternavn = ?, " +
                "telefonnr = ?, epost = ? WHERE id = ?";
        try {
            dataBase.update(sql, b.getFilm(), b.getAntall(), b.getFornavn(), b.getEtternavn(), b.getTelefonnr(), b.getEpost(), b.getId());
            return true;
        }
        catch (Exception e) {
            logger.severe("Feil i endre en billett: " + e);
            return false;
        }
    }

    public boolean slettEnBillett(int id) {
        String sql = "DELETE FROM Billett WHERE id = ?";
        try {
            dataBase.update(sql, id);
            return true;
        }
        catch (Exception e) {
            logger.severe("Feil i slett en billett: " + e);
            return false;
        }
    }

    public boolean slettAlleBilletter() {
        String sql = "DELETE FROM Billett";
        try {
            dataBase.update(sql);
            return true;
        }
        catch (Exception e) {
            logger.severe("Feil i slett alle billetter: "+ e);
            return false;
        }
    }
}
