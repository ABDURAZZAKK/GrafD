package com.example.springboot.repo;

import com.example.springboot.models.Test;
import org.springframework.data.repository.CrudRepository;

public interface TestRepo extends CrudRepository<Test, Long>{
}
