package com.example.springboot.controllers;

import com.example.springboot.models.SecuritiesTable;
import com.example.springboot.repo.SecuritiesTableRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.GregorianCalendar;
import java.util.List;

@RestController
@RequestMapping("message")
public class GreetingController {
    private final SecuritiesTableRepo tableRepo;



    @Autowired
    public GreetingController(SecuritiesTableRepo tableRepo){
        this.tableRepo = tableRepo;
    }




    @GetMapping()
    public List<SecuritiesTable> getData() {
        return tableRepo.findAll();
    }

    @GetMapping("/data")
    public List<List<Long>> list() {
        Long price, data;
        List<Long> jlist = new ArrayList<Long>();
        String[] strdata;

        List<List<Long>> map =  new ArrayList<List<Long>>();
        List<SecuritiesTable> table = tableRepo.findAll();
        for (SecuritiesTable i :table){

            strdata = i.getDate().split("-");
            int y = Integer.valueOf(strdata[2]);
            int m = Integer.valueOf(strdata[1]);
            int d = Integer.valueOf(strdata[0]);

            data = new GregorianCalendar(y, m, m).getTime().getTime();
            price =  Long.valueOf(i.getPrice().replaceAll("[^0-9]", ""));
            if (price.equals(null)) continue;
            map.add(Arrays.asList(data,price));
        }

        return map;
    }

    @GetMapping("{id}")
    public SecuritiesTable getOne(@PathVariable("id") SecuritiesTable secu) {
        return secu;
    }



    @PostMapping
    public SecuritiesTable create(@RequestBody SecuritiesTable secu) {
        return tableRepo.save(secu);
    }

    @PutMapping({"{id}"})
    public SecuritiesTable update(@PathVariable("id") SecuritiesTable secuFromDb,@RequestBody SecuritiesTable secu,@PathVariable("id") String id){
        if(!(secu.getName() == null) )
            secuFromDb.setName(secu.getName());
        else if(!(secu.getDate() == null))
            secuFromDb.setDate(secu.getDate());
        else if(!(secu.getPrice()== null))
            secuFromDb.setPrice(secu.getPrice());
        return tableRepo.save(secuFromDb);
    }

    @DeleteMapping({"{id}"})
    public void delete(@PathVariable("id") SecuritiesTable secu){
        tableRepo.delete(secu);
    }

//    @GetMapping("/data")
//    public @ResponseBody
//    Object getBeers() {
//        Resource resource = new ClassPathResource("/static/data.json");
//        try {
//            ObjectMapper mapper = new ObjectMapper();
//            return mapper.readValue(resource.getInputStream(), Object.class);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return null;
//    }





//    private int counter = 4;
//
//    private List<Map<String, String>> messages = new ArrayList<>() {{
//        add(new HashMap<String, String>() {{
//            put("id", "1");
//            put("name", "APLLE");
//            put("date", "21.12.2021");
//            put("price", "100");
//
//        }});
//        add(new HashMap<String, String>() {{
//            put("id", "2");
//            put("name", "GOOGLE");
//            put("date", "22.12.2021");
//            put("price", "105");
//
//        }});
//        add(new HashMap<String, String>() {{
//            put("id", "3");
//            put("name", "AMAZON");
//            put("date", "23.12.2021");
//            put("price", "110");
//
//        }});
//    }};
//
//    @GetMapping
//    public List<Map<String, String>> list() {
//        return messages;
//    }
//
//    @GetMapping("{id}")
//    public Map<String, String> getOne(@PathVariable String id) {
//        return getMessage(id);
//    }
//
//    private Map<String, String> getMessage(String id) {
//        return messages.stream()
//                .filter(message -> message.get("id").equals(id)).findFirst()
//                .orElseThrow(NotFoundException::new);
//    }
//
//    @PostMapping
//    public Map<String, String> create(@RequestBody Map<String, String> message) {
//        message.put("id", String.valueOf(counter++));
//        messages.add(message);
//        return message;
//    }
//
//    @PutMapping({"{id}"})
//    public Map<String,String> update(@PathVariable String id ,@RequestBody Map<String,String> message){
//        Map<String,String> messFromDb = getMessage(id);
//        messFromDb.putAll(message);
//        messFromDb.put("id",id);
//        return messFromDb;
//    }
//
//    @DeleteMapping({"{id}"})
//    public void delete(@PathVariable String id){
//        Map<String,String> message = getMessage(id);
//        messages.remove(message);
//    }

}
