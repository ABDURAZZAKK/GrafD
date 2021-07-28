package com.example.springboot.controllers;

import com.fasterxml.jackson.annotation.JsonGetter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class Home {
    @GetMapping("/")
    public String home(Model model){
        return "home";
    }

}
