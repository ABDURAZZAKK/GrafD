package com.example.springboot.repo;

import com.example.springboot.models.SecuritiesTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SecuritiesTableRepo extends JpaRepository<SecuritiesTable, Long> {
}
