package com.modir.config;

import com.modir.model.*;
import com.modir.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Arrays; // اضافه شد

@Configuration
public class DataLoaderConfig {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner loadData(
            UserRepository userRepository,
            UnitRepository unitRepository,
            TransactionRepository transactionRepository,
            MaintenanceTicketRepository ticketRepository,
            PollRepository pollRepository,
            PollOptionRepository pollOptionRepository
    ) {
        return args -> {
            // Create Units
            Unit unit101 = new Unit("101", "1", 85.5, 50000.0);
            Unit unit102 = new Unit("102", "1", 92.3, 55000.0);
            Unit unit201 = new Unit("201", "2", 105.7, 60000.0);
            unitRepository.saveAll(Arrays.asList(unit101, unit102, unit201));

            // Create Users
            User manager = new User("admin", passwordEncoder.encode("admin123"), "علی احمدی", UserRole.MANAGER, "09123456789");
            manager.setUnit(unit101);
            userRepository.save(manager);

            User owner1 = new User("owner1", passwordEncoder.encode("owner123"), "سارا مرادی", UserRole.OWNER, "09198765432");
            owner1.setUnit(unit101);
            userRepository.save(owner1);

            User tenant1 = new User("tenant1", passwordEncoder.encode("tenant123"), "محمد رضایی", UserRole.TENANT, "09155555555");
            tenant1.setUnit(unit102);
            userRepository.save(tenant1);

            User staff1 = new User("staff1", passwordEncoder.encode("staff123"), "احمد کریمی", UserRole.STAFF, "09177777777");
            staff1.setUnit(unit201);
            userRepository.save(staff1);

            // Create Transactions
            Transaction t1 = new Transaction("قبض برق", 150000.0, LocalDateTime.now().minusDays(10), TransactionType.EXPENSE, "utility", unit101);
            t1.setStatus("paid");
            transactionRepository.save(t1);

            Transaction t2 = new Transaction("شارژ ماهانه", 50000.0, LocalDateTime.now().minusDays(5), TransactionType.INCOME, "monthly_fee", unit101);
            t2.setStatus("pending");
            transactionRepository.save(t2);

            Transaction t3 = new Transaction("قبض آب", 80000.0, LocalDateTime.now().minusDays(3), TransactionType.EXPENSE, "utility", unit102);
            t3.setStatus("paid");
            transactionRepository.save(t3);

            // Create Maintenance Tickets
            MaintenanceTicket ticket1 = new MaintenanceTicket("تعمیر آسانسور", "آسانسور طبقه ۲ کار نمی‌کند",
                    "سارا مرادی", owner1.getId(), TicketStatus.IN_PROGRESS, "high", unit201);
            ticketRepository.save(ticket1);

            MaintenanceTicket ticket2 = new MaintenanceTicket("تعویض لامپ", "لامپ راهرو خراب است",
                    "محمد رضایی", tenant1.getId(), TicketStatus.OPEN, "low", unit102);
            ticketRepository.save(ticket2);

            // Create Polls
            Poll poll1 = new Poll("آیا با نصب دوربین امنیتی موافقید؟", true);
            pollRepository.save(poll1);

            PollOption option1 = new PollOption("بله، موافقم", poll1);
            PollOption option2 = new PollOption("خیر، مخالفم", poll1);
            PollOption option3 = new PollOption("بی‌تفاوت", poll1);
            pollOptionRepository.saveAll(Arrays.asList(option1, option2, option3));

            System.out.println("Database initialized with sample data!");
        };
    }
}
