import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { CompanyProps } from "@/types/db/company.type";
import { useCompanyRepository } from "@/hooks/sqlite/useCompany";
import { CompanyTypeDto } from "@/dto/companyType.dto";
import { Collapsible } from "@/components/Collapsible";

export default function CompaniesScreen() {
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [companiesType, setCompaniesType] = useState<CompanyTypeDto[]>([]);
  const companyRepo = useCompanyRepository();

  const loadCompanies = useCallback(async () => {
    const companies = await companyRepo.getAll();

    const companyType: CompanyTypeDto[] = companies.map((company) => ({
      id: company.idType,
      name: company.nameType,
    }));

    console.log(companies);
    console.log(companyType);
    setCompaniesType(companyType);
    setCompanies(companies);
  }, [companyRepo]);

  useEffect(() => {
    async function setup() {
      await loadCompanies();
    }
    setup();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome Companies!</ThemedText>
      </ThemedView>
      {companiesType.map((compType) => (
        <Collapsible title={compType.name} key={compType.id}>
          {companies
            .filter((comp) => comp.idType === compType.id)
            .map((comp) => (
              <ThemedText type="default" key={comp.id}>
                {comp.name}
              </ThemedText>
            ))}
        </Collapsible>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
