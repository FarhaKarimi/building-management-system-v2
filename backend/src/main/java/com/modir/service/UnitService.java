package com.modir.service;

import com.modir.model.Unit;
import com.modir.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UnitService {

    @Autowired
    private UnitRepository unitRepository;

    public List<Unit> getAllUnits() {
        return unitRepository.findAllOrderByUnitNumber();
    }

    public Unit getUnitById(Long id) {
        return unitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Unit not found"));
    }

    public Unit getUnitByNumber(String unitNumber) {
        return unitRepository.findByUnitNumber(unitNumber)
                .orElseThrow(() -> new RuntimeException("Unit not found"));
    }

    public Unit createUnit(Unit unit) {
        if (unitRepository.findByUnitNumber(unit.getUnitNumber()).isPresent()) {
            throw new RuntimeException("Unit number already exists");
        }
        return unitRepository.save(unit);
    }

    public Unit updateUnit(Long id, Unit unitDetails) {
        Unit unit = unitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        unit.setFloor(unitDetails.getFloor());
        unit.setAreaSqm(unitDetails.getAreaSqm());
        unit.setMonthlyFee(unitDetails.getMonthlyFee());

        return unitRepository.save(unit);
    }

    public void deleteUnit(Long id) {
        unitRepository.deleteById(id);
    }

    public Long getTotalUnits() {
        return unitRepository.countAllUnits();
    }
}