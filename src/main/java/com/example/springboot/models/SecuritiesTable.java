package com.example.springboot.models;

import javax.persistence.*;


@Entity
public class SecuritiesTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String price;

    @Column(name = "date")
    private String date;


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
