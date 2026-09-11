package lk.ijse.CakeShop;

//import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CakeShopApplication {
	public static void main(String[] args) {

//        // Load .env file variables into Java System Properties
//        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
//        dotenv.entries().forEach(entry -> {
//            System.setProperty(entry.getKey(), entry.getValue());
//        });

        SpringApplication.run(CakeShopApplication.class, args);
	}

}
