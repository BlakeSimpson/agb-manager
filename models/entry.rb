class Entry < ActiveRecord::Base
  VALID_LOCALES = ["EN", "DE", "FR", "ES", "IT", "ZH-HANS", "ZH-HANT", "DK", "NL", "JP", "RU", "AR", "EL", "ID", "KO", "MA", "PL", "PT-BR", "SV", "TH", "TR", "VI"].sort

  validates :content, presence: true
  validates :locale, presence: true, inclusion: {in: VALID_LOCALES}
end
