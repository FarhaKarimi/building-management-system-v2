package com.modir.repository;

import com.modir.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {
    
    Optional<Unit> findByUnitNumber(String unitNumber);
    
    @Query("SELECT u FROM Unit u ORDER BY u.unitNumber")
    List<Unit> findAllOrderByUnitNumber();
    
    @Query("SELECT COUNT(u) FROM Unit u")
    Long countAllUnits();
}