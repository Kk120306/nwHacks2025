import java.sql.*;
import java.util.Scanner;

public class SimpleLoginApp {
    
    private static Connection connect() {
        try {
            String url = "jdbc:sqlite:users.db";
            Connection conn = DriverManager.getConnection(url);
            return conn;
        } catch (SQLException e) {
            System.out.println("Connection failed: " + e.getMessage());
            return null;
        }
    }

    private static void createTable() {
        String sql = "CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT NOT NULL)";
        
        try (Connection conn = connect();
             Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
        } catch (SQLException e) {
            System.out.println("Table creation failed: " + e.getMessage());
        }
    }

    private static boolean userExists(String username) {
        String sql = "SELECT 1 FROM users WHERE username = ?";
        
        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, username);
            ResultSet rs = pstmt.executeQuery();
            return rs.next();
        } catch (SQLException e) {
            System.out.println("Error checking if user exists: " + e.getMessage());
            return false;
        }
    }

    private static boolean verifyPassword(String username, String password) {
        String sql = "SELECT password FROM users WHERE username = ?";
        
        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, username);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                return rs.getString("password").equals(password);
            }
        } catch (SQLException e) {
            System.out.println("Error verifying password: " + e.getMessage());
        }
        return false;
    }

    private static void registerUser(String username, String password) {
        String sql = "INSERT INTO users(username, password) VALUES(?, ?)";
        
        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, username);
            pstmt.setString(2, password);
            pstmt.executeUpdate();
            System.out.println("User registered successfully.");
        } catch (SQLException e) {
            System.out.println("Error registering user: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        createTable(); // Ensure the users table exists

        Scanner scanner = new Scanner(System.in);
        
        // Register a new user
        System.out.println("Do you have an account? (y/n): ");
        String response = scanner.nextLine();

        if (response.equalsIgnoreCase("n")) {
            // Register a new user
            System.out.print("Enter a username: ");
            String username = scanner.nextLine();
            System.out.print("Enter a password: ");
            String password = scanner.nextLine();

            if (userExists(username)) {
                System.out.println("Username already exists. Try another one.");
            } else {
                registerUser(username, password);
            }
        }

        // Login
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        System.out.print("Enter password: ");
        String password = scanner.nextLine();

        if (verifyPassword(username, password)) {
            System.out.println("Login successful!");
        } else {
            System.out.println("Invalid credentials.");
        }

        scanner.close();
    }
}

