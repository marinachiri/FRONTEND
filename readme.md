# Bikes App - Frontend

# v1.0 - Intermediate Deliverable - 23.11.2023

# demo:

Landing page cu un preview la tipul de biciclete disponibile, sau click pe Products pentru a le vedea
Click pe available bikes pentru a vedea bicicletele disponibile pentru inchiriat si locatiile acestora.
Click pe un marker => apoi reserve, care va redirectiona catre un stripe checkout

# Implemented:

- Interfetele din frontend respecta structura din backend: Bikes_type - interfata pentru tipul bicicletelor, bikes -
  interfata pentru biciclete, cu locatiile lor si tipul de bicicleta.
- Preia datele ( locatiile si detaliile bicicletelor ) din backend in folderul services si in functiile din fisierul corespunzator fiecarei componente
- Google maps integration cu redirect la stripecheckout
- stripe checkout cu redirect catre succes / cancel (components/success, components/cancel)

# TO DO:

- Signup
- Adauga paginile contact si about us
- Fix maps center - centrata astfel incat sa cuprinda markerele ( fit bounds )
- User profile
