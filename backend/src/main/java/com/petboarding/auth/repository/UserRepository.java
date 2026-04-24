package com.petboarding.auth.repository;

import com.petboarding.auth.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByPhone(String phone);

    Optional<User> findByEmail(String email);

    Optional<User> findByOpenId(String openId);

    boolean existsByPhone(String phone);

    boolean existsByEmail(String email);
}
